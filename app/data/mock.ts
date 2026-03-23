export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  roles: Role[];
}

export interface Role {
  id: string;
  title: string;
  skills: string[];
  eligibility: string;
  stipend: string;
  location: string;
  deadline: string;
  applyLink: string;
  domain: string;
}

export const mockCompanies: Company[] = [
  {
    id: "tech-nova",
    name: "TechNova Solutions",
    logo: "TN",
    industry: "Software & IT",
    location: "Bangalore, India",
    shortDescription: "Leading provider of scalable cloud infrastructure.",
    fullDescription: "TechNova Solutions is at the forefront of cloud computing, offering robust and scalable infrastructure solutions to enterprises worldwide...",
    roles: [
      {
        id: "sde-intern",
        title: "Software Development Intern",
        skills: ["React", "Node.js", "TypeScript"],
        eligibility: "B.Tech/B.E. Computer Science, 2026 Batch",
        stipend: "₹45,000 / month",
        location: "Hybrid (Bangalore)",
        deadline: "April 15, 2026",
        applyLink: "#apply",
        domain: "Software"
      }
    ]
  },
  {
    id: "aethos-ai",
    name: "Aethos AI",
    logo: "AE",
    industry: "Artificial Intelligence",
    location: "Remote",
    shortDescription: "Building the next generation of generative AI models.",
    fullDescription: "Aethos AI is a fast-growing startup focused on creating generative AI workflows for creatives. We believe in open-source AI and rapid iteration...",
    roles: [
      {
        id: "ml-research",
        title: "Machine Learning Intern",
        skills: ["Python", "PyTorch", "Transformers"],
        eligibility: "M.Tech/Ph.D. or exceptional B.Tech, 2026 Batch",
        stipend: "₹60,000 / month",
        location: "Remote",
        deadline: "May 1, 2026",
        applyLink: "#apply",
        domain: "AI/ML"
      }
    ]
  },
  {
    id: "quantum-fin",
    name: "QuantumFin",
    logo: "QF",
    industry: "Finance & Fintech",
    location: "Mumbai, India",
    shortDescription: "Disrupting algorithmic trading with quantum computing.",
    fullDescription: "QuantumFin merges cutting-edge computing with financial markets. We are building the infrastructure for the next era of high-frequency trading...",
    roles: [
      {
        id: "quant-analyst",
        title: "Quant Analyst Intern",
        skills: ["C++", "Mathematics", "Python"],
        eligibility: "Open to all branches, CGPA > 8.5",
        stipend: "₹80,000 / month",
        location: "Mumbai On-site",
        deadline: "April 20, 2026",
        applyLink: "#apply",
        domain: "Finance"
      }
    ]
  }
];
