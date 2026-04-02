import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

type OnlineInterviewSlot = {
  time: string;
  name: string;
  sapId: string;
};

const ONLINE_SCHEDULES: Record<string, { company: string; fileName: string; interviewDate: string }> = {
  stravex: {
    company: "Stravex (Online)",
    fileName: "Stravex (Online).csv",
    interviewDate: "3rd April, 2026",
  },
  "we-matter-round-2": {
    company: "WE Matter - Round 2 (Online)",
    fileName: "WE Matter - Round 2 (Online).csv",
    interviewDate: "3rd April, 2026",
  },
};

const ONLINE_SLOTS_DIR = path.join(process.cwd(), "app", "interview-slots");

function normalizeHeader(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
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

function getCell(values: string[], index: number): string {
  if (index < 0 || index >= values.length) {
    return "";
  }

  return values[index]?.trim() ?? "";
}

function parseOnlineSlotsFromCsv(csvContent: string): OnlineInterviewSlot[] {
  const lines = csvContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const parsedLines = lines.map((line) => parseCsvLine(line));

  const headerRowIndex = parsedLines.findIndex((cells) => {
    const normalized = cells.map((cell) => normalizeHeader(cell));
    return (
      normalized.includes("time") &&
      normalized.includes("name") &&
      (normalized.includes("sap") || normalized.includes("sap_id"))
    );
  });

  if (headerRowIndex === -1) {
    return [];
  }

  const header = parsedLines[headerRowIndex].map((cell) => normalizeHeader(cell));
  const timeIndex = header.findIndex((cell) => cell === "time");
  const nameIndex = header.findIndex((cell) => cell === "name");
  const sapIdIndex = header.findIndex((cell) => cell === "sap" || cell === "sap_id");

  if (timeIndex === -1 || nameIndex === -1 || sapIdIndex === -1) {
    return [];
  }

  const rows: OnlineInterviewSlot[] = [];

  for (const values of parsedLines.slice(headerRowIndex + 1)) {
    const time = getCell(values, timeIndex);
    const name = getCell(values, nameIndex);
    const sapId = getCell(values, sapIdIndex);

    if (!time || !name || !sapId) {
      continue;
    }

    rows.push({ time, name, sapId });
  }

  return rows;
}

export async function GET(request: NextRequest) {
  const companyKey = request.nextUrl.searchParams.get("company")?.trim().toLowerCase() ?? "";

  if (!companyKey || !ONLINE_SCHEDULES[companyKey]) {
    return NextResponse.json(
      { error: "Unsupported company. Supported values: stravex, we-matter-round-2." },
      { status: 400 },
    );
  }

  const schedule = ONLINE_SCHEDULES[companyKey];
  const filePath = path.join(ONLINE_SLOTS_DIR, schedule.fileName);

  try {
    const csvContent = await fs.readFile(filePath, "utf-8");
    const slots = parseOnlineSlotsFromCsv(csvContent);

    return NextResponse.json({
      company: schedule.company,
      interviewDate: schedule.interviewDate,
      slots,
      totalSlots: slots.length,
    });
  } catch {
    return NextResponse.json({ error: "Failed to read online interview schedule CSV." }, { status: 500 });
  }
}