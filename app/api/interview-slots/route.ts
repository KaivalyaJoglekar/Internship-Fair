import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

type SlotRow = {
  sapId: string;
  name: string;
  email: string;
  company: string;
  role: string;
  panel: string;
  date: string;
  time: string;
};

type CompanyGroup = {
  company: string;
  slots: Array<Pick<SlotRow, "company" | "role" | "panel" | "date" | "time">>;
};

const CSV_DIR = path.join(process.cwd(), "app", "interview-slots");

const COMPANY_ALIASES: Record<string, string> = {
  nexaflo: "Nexaflo Automation",
  nexaflo_automation: "Nexaflo Automation",
  nexaflo_automations: "Nexaflo Automation",
  nexaflo_automations_shortlisted: "Nexaflo Automation",
};

function normalizeHeader(header: string): string {
  return header.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function normalizeSapId(value: string): string {
  return value.trim();
}

function normalizeName(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

function normalizeCompanyKey(value: string): string {
  return normalizeHeader(value);
}

function isLikelyHeaderCell(value: string): boolean {
  const normalized = normalizeHeader(value);

  return (
    normalized === "time" ||
    normalized === "name" ||
    normalized === "sap" ||
    normalized === "sap_id" ||
    normalized === "date" ||
    normalized === "panel" ||
    normalized === "role" ||
    normalized === "email" ||
    normalized === "company" ||
    normalized === "company_name"
  );
}

function canonicalizeCompany(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  const withoutParentheticalSuffix = trimmed.replace(/\s*\([^)]*\)\s*$/g, "").trim();
  const normalized = normalizeCompanyKey(withoutParentheticalSuffix);

  return COMPANY_ALIASES[normalized] ?? withoutParentheticalSuffix;
}

function getCell(values: string[], index: number): string {
  if (index < 0 || index >= values.length) {
    return "";
  }

  return values[index]?.trim() ?? "";
}

function uniqueNonEmpty(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const rawValue of values) {
    const value = rawValue.trim();
    if (!value) {
      continue;
    }

    const normalized = value.toLowerCase();
    if (seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    result.push(value);
  }

  return result;
}

function splitCompanyValues(value: string): string[] {
  return value
    .split(/\s*(?:,|\/|;|\|)\s*/)
    .flatMap((part) => part.split(/\s+(?:and|&)\s+/i))
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (insideQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      result.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current.trim());
  return result;
}

function getCompanyFromFile(fileName: string, lines: string[]): string {
  const firstRow = parseCsvLine(lines[0] ?? "");
  const candidate = firstRow.find((cell) => cell.trim().length > 0)?.trim() ?? "";
  const companyFromFileName = canonicalizeCompany(path.basename(fileName, path.extname(fileName)));

  if (candidate && !isLikelyHeaderCell(candidate)) {
    return canonicalizeCompany(candidate);
  }

  return companyFromFileName;
}

function parseStandardRows(
  fileName: string,
  lines: string[],
  headers: string[],
  headerRowIndex: number,
): SlotRow[] {
  const headerIndex: Record<string, number> = Object.fromEntries(
    headers.map((header, index) => [normalizeHeader(header), index]),
  );

  const sapIndex = headerIndex.sap_id;

  if (sapIndex === undefined) {
    return [];
  }

  const companyFromFile = getCompanyFromFile(fileName, lines);
  const rows: SlotRow[] = [];

  const companyColumnIndexes = headers
    .map((header, index) => ({ key: normalizeHeader(header), index }))
    .filter(({ key }) => {
      return (
        key === "company" ||
        key === "company_name" ||
        key === "both" ||
        key === "company_2" ||
        key === "second_company" ||
        key === "other_company" ||
        key === "co_company" ||
        key === "additional_company" ||
        (key.includes("company") && key !== "company_code")
      );
    })
    .map(({ index }) => index);

  for (const line of lines.slice(headerRowIndex + 1)) {
    const values = parseCsvLine(line);
    const sapId = getCell(values, sapIndex);

    if (!sapId) {
      continue;
    }

    const explicitCompanyValues = [
      ...companyColumnIndexes.map((index) => getCell(values, index)),
      getCell(values, headerIndex.company),
      getCell(values, headerIndex.company_name),
    ];

    const explicitCompanies = uniqueNonEmpty(
      explicitCompanyValues.flatMap((value) => splitCompanyValues(value)),
    ).map((company) => canonicalizeCompany(company));

    const fallbackCompanies = uniqueNonEmpty(splitCompanyValues(companyFromFile)).map((company) =>
      canonicalizeCompany(company),
    );
    const companyCandidates = explicitCompanies.length > 0 ? explicitCompanies : fallbackCompanies;

    const role =
      getCell(values, headerIndex.role) ||
      getCell(values, headerIndex.position) ||
      getCell(values, headerIndex.designation);
    const panel = getCell(values, headerIndex.panel);
    const date = getCell(values, headerIndex.date);
    const time = getCell(values, headerIndex.time);
    const name = getCell(values, headerIndex.name);
    const email = getCell(values, headerIndex.email);

    for (const company of companyCandidates) {
      rows.push({
        sapId,
        name,
        email,
        company,
        role,
        panel,
        date,
        time,
      });
    }
  }

  return rows;
}

function parsePanelScheduleRows(fileName: string, lines: string[], headerRowIndex: number): SlotRow[] {
  const company = getCompanyFromFile(fileName, lines);
  const headerCells = parseCsvLine(lines[headerRowIndex] ?? "");
  const panelCells = parseCsvLine(lines[headerRowIndex - 1] ?? "");

  const panelStarts: number[] = [];

  for (let index = 0; index < headerCells.length; index += 1) {
    const first = normalizeHeader(headerCells[index] ?? "");
    const second = normalizeHeader(headerCells[index + 1] ?? "");
    const third = normalizeHeader(headerCells[index + 2] ?? "");

    if (first === "time" && second === "name" && (third === "sap_id" || third === "sap")) {
      panelStarts.push(index);
      index += 2;
    }
  }

  if (panelStarts.length === 0) {
    return [];
  }

  const rows: SlotRow[] = [];

  for (const line of lines.slice(headerRowIndex + 1)) {
    const values = parseCsvLine(line);

    for (let panelNumber = 0; panelNumber < panelStarts.length; panelNumber += 1) {
      const start = panelStarts[panelNumber];
      const time = getCell(values, start);
      const name = getCell(values, start + 1);
      const sapId = getCell(values, start + 2);

      if (!sapId) {
        continue;
      }

      const panelLabelCandidate = getCell(panelCells, start);
      const panelLabel = panelLabelCandidate || `Panel ${panelNumber + 1}`;

      rows.push({
        sapId,
        name,
        email: "",
        company,
        role: "",
        panel: panelLabel,
        date: "",
        time,
      });
    }
  }

  return rows;
}

function sortSlotsByDateAndTime(
  slots: Array<Pick<SlotRow, "company" | "role" | "panel" | "date" | "time">>,
): Array<Pick<SlotRow, "company" | "role" | "panel" | "date" | "time">> {
  return [...slots].sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    if (a.time !== b.time) {
      return a.time.localeCompare(b.time);
    }
    if (a.panel !== b.panel) {
      return a.panel.localeCompare(b.panel);
    }
    if (a.role !== b.role) {
      return a.role.localeCompare(b.role);
    }
    return a.time.localeCompare(b.time);
  });
}

async function readAllSlotRows(): Promise<SlotRow[]> {
  let dirEntries;

  try {
    dirEntries = await fs.readdir(CSV_DIR, { withFileTypes: true });
  } catch (error) {
    const hasCode = typeof error === "object" && error !== null && "code" in error;
    const errorCode = hasCode ? (error as { code?: string }).code : undefined;

    if (errorCode === "ENOENT") {
      return [];
    }

    throw error;
  }

  const csvFileNames = dirEntries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".csv"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const rows: SlotRow[] = [];

  for (const fileName of csvFileNames) {
    const filePath = path.join(CSV_DIR, fileName);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const lines = fileContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length <= 1) {
      continue;
    }

    const parsedLines = lines.map((line) => parseCsvLine(line));

    let headerRowIndex = -1;
    let standardHeaders: string[] = [];

    for (let lineIndex = 0; lineIndex < parsedLines.length; lineIndex += 1) {
      const normalized = parsedLines[lineIndex].map((cell) => normalizeHeader(cell));
      if (normalized.includes("sap_id") && normalized.includes("name")) {
        headerRowIndex = lineIndex;
        standardHeaders = parsedLines[lineIndex];
        break;
      }
    }

    if (headerRowIndex === -1) {
      continue;
    }

    const normalizedHeaders = standardHeaders.map((header) => normalizeHeader(header));
    const hasStandardLayout =
      normalizedHeaders.includes("company") ||
      normalizedHeaders.includes("company_name") ||
      normalizedHeaders.includes("role") ||
      normalizedHeaders.includes("date");

    if (hasStandardLayout) {
      rows.push(...parseStandardRows(fileName, lines, standardHeaders, headerRowIndex));
    } else {
      rows.push(...parsePanelScheduleRows(fileName, lines, headerRowIndex));
    }
  }

  return rows;
}

export async function GET(request: NextRequest) {
  const sapId = request.nextUrl.searchParams.get("sapId")?.trim() ?? "";
  const normalizedSapId = normalizeSapId(sapId);

  if (!normalizedSapId) {
    return NextResponse.json({ error: "sapId query parameter is required." }, { status: 400 });
  }

  try {
    const allRows = await readAllSlotRows();
    const matchingRows = allRows.filter((row) => normalizeSapId(row.sapId) === normalizedSapId);

    const dedupe = new Set<string>();
    const uniqueRows = matchingRows.filter((row) => {
      const key = `${normalizeName(row.name)}|${row.company}|${row.role}|${row.panel}|${row.date}|${row.time}`;
      if (dedupe.has(key)) {
        return false;
      }
      dedupe.add(key);
      return true;
    });

    const participant = uniqueRows[0]
      ? {
          name: uniqueRows[0].name,
          email: uniqueRows[0].email,
        }
      : null;

    const groupedByCompany = uniqueRows.reduce<Record<string, CompanyGroup>>((acc, row) => {
      if (!acc[row.company]) {
        acc[row.company] = { company: row.company, slots: [] };
      }

      acc[row.company].slots.push({
        company: row.company,
        role: row.role,
        panel: row.panel,
        date: row.date,
        time: row.time,
      });

      return acc;
    }, {});

    const companies = Object.values(groupedByCompany)
      .sort((a, b) => a.company.localeCompare(b.company))
      .map((group) => ({
        ...group,
        slots: sortSlotsByDateAndTime(group.slots),
      }));

    return NextResponse.json({
      sapId,
      participant,
      companies,
      totalSlots: uniqueRows.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to load interview slots from CSV files." },
      { status: 500 },
    );
  }
}