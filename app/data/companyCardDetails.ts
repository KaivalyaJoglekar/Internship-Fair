export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  shortDescription: string;
  deadline?: string;
  roles: Role[];
}

export interface Role {
  id: string;
  title: string;
  roleType?: "tech" | "non-tech";
  deadline: string;
  jdPdf: string;
  applyLink: string;
  stipend: string;
}

const baseCompanies: Company[] = [
  {
    id: "rudra-cybersecurity",
    name: "RUDRA CyberSecurity",
    logo: "/logos/RUDRA CyberSecurity.png",
    industry: "Cybersecurity",
    shortDescription: "Core cybersecurity internship opportunity with engineering-focused exposure.",
    deadline: "30 March, 2026, 8:00 PM",
    roles: [
      {
        id: "cyber-security-engineer-intern",
        title: "Cyber Security Engineer Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/RUDRA%20-%20Cyber%20Security%20Engineer.pdf",
        applyLink: "https://forms.gle/pjawz47RDUbNVeKc7",
        stipend: "₹10,000 / month"
      }
    ]
  },
  
  {
    id: "galaxy-homeautomation",
    name: "Galaxy Home  Automation",
    logo: "/logos/Galaxy HomeAutomation.png",
    industry: "IoT & Smart Home",
    shortDescription: "Internship openings across AI, business growth, marketing, and R&D tracks.",
    deadline: "Closed",
    roles: [
      {
        id: "ai-intern",
        title: "AI Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Galaxy%20Home%20Automation%20-%20AI.pdf",
        applyLink: "https://forms.gle/NAPVe1DnQYgtRH8S9",
        stipend: "₹10,000 / month"
      },
      {
        id: "business-development-intern",
        title: "Business Development Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Galaxy%20Home%20Automation%20-%20Business%20development.pdf",
        applyLink: "https://forms.gle/NAPVe1DnQYgtRH8S9",
        stipend: "₹10,000 / month"
      },
      {
        id: "digital-marketing-head-intern",
        title: "Digital Marketing Head Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Galaxy%20HomeAutomation%20-%20Digital%20Marketing%20Head.pdf",
        applyLink: "https://forms.gle/NAPVe1DnQYgtRH8S9",
        stipend: "₹10,000 / month"
      },
      {
        id: "research-development-intern",
        title: "Research and Development Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Galaxy%20HomeAutomation%20-%20Research%20and%20Developement.pdf",
        applyLink: "https://forms.gle/NAPVe1DnQYgtRH8S9",
        stipend: "₹10,000 / month"
      }
    ]
  },
  
  
  {
    id: "stravex",
    name: "Stravex",
    logo: "/logos/Stravex.png",
    industry: "Logistics & Operations Tech",
    shortDescription: "Internship opportunities in marketing growth and creative media production.",
    deadline: "30 March, 2026, 8:00 PM",
    roles: [
      {
        id: "graphic-video-editing-intern",
        title: "Graphic Design and Video Editing Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Stravex%20-%20Graphic%20Design%20and%20Video%20Editing.pdf",
        applyLink: "https://forms.gle/Jv22WggKqV9kjep59",
        stipend: "₹5,000 / month"
      },
      {
        id: "marketing-strategy-growth-intern",
        title: "Marketing Strategy and Growth Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Stravex%20-%20Marketing%20Strategy%20and%20Growth.pdf",
        applyLink: "https://forms.gle/Jv22WggKqV9kjep59",
        stipend: "₹10,000 / month"
      }
    ]
  },
  {
    id: "expanse-digital",
    name: "Expanse Digital",
    logo: "/logos/Expanse Digital.png",
    industry: "Digital Marketing & Product",
    shortDescription: "Hiring across design and marketing roles for internship positions.",
    deadline: "30 March, 2026, 8:00 PM",
    roles: [
      {
        id: "graphic-design-intern",
        title: "Graphic Design Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Digital%20Expanse%20-%20Graphic%20Design.pdf",
        applyLink: "https://forms.gle/dJzoayUCMAgNeZLb6",
        stipend: "₹10,000 / month"
      },
      {
        id: "performance-marketing-intern",
        title: "Performance Marketing Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Digital%20Expanse%20-%20Performance%20Marketing.pdf",
        applyLink: "https://forms.gle/dJzoayUCMAgNeZLb6",
        stipend: "₹10,000 / month"
      },
      {
        id: "social-media-marketing-intern",
        title: "Social Media Marketing Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Digital%20Expanse%20-%20Social%20Media%20Marketing.pdf",
        applyLink: "https://forms.gle/dJzoayUCMAgNeZLb6",
        stipend: "₹10,000 / month"
      },
      {
        id: "video-editor-intern",
        title: "Video Editor Intern",
        deadline: "11:00 PM Today", 
        jdPdf: "/Job%20Description/Digital%20Expanse%20-%20Video%20Editor.pdf",
        applyLink: "https://forms.gle/dJzoayUCMAgNeZLb6",
        stipend: "₹10,000 / month"
      }
    ]
  },
  
  
  {
    id: "zency",
    name: "Zency",
    logo: "/logos/Zency.png",
    industry: "Content Marketing",
    shortDescription: "Content marketing internship for brand communication and growth campaigns.",
    deadline: "30 March, 2026, 8:00 PM",
    roles: [
      {
        id: "content-marketing-intern",
        title: "Content Marketing Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Zency%20-%20Content%20Marketing.pdf",
        applyLink: "https://forms.gle/dVbZFuNv7dRhRG7Y9",
        stipend: "Unpaid (Learning Internship)"
      }
    ]
  },
  {
    id: "we-matter",
    name: "WE MATTER",
    logo: "/logos/WE MATTER.png",
    industry: "Technology & Software",
    shortDescription: "Internships focused on software development and product engineering in mission-driven environments.",
    deadline: "Closed",
    roles: [
      {
        id: "software-developer-intern",
        title: "Software Developer Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/WE%20MATTER%20-%20Software%20Developer.pdf",
        applyLink: "https://forms.gle/VeCYLBbEwnDquLKN7",
        stipend: "₹10,000 / month"
      }
    ]
  },
  {
    id: "kreare",
    name: "Kreare",
    logo: "/logos/Kreare - Logo.png",
    industry: "Creative & Business Services",
    shortDescription: "Openings across design, animation, and business development internship tracks.",
    deadline: "30 March, 2026, 8:00 PM",
    roles: [
      {
        id: "graphic-design-intern",
        title: "Graphic Design Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Kreare%20-%20Graphic%20Design.pdf",
        applyLink: "https://forms.gle/KSS8vbrkVL6VTKLp6",
        stipend: "₹5,000 / month"
      },
      {
        id: "motion-graphics-intern",
        title: "Motion Graphics Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Kreare%20-%20Motion%20Graphics.pdf",
        applyLink: "https://forms.gle/KSS8vbrkVL6VTKLp6",
        stipend: "₹5,000 / month"
      },
      {
        id: "sales-business-development-intern",
        title: "Sales & Business Development Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Kreare%20-%20Sales%20%26%20Business%20Development.pdf",
        applyLink: "https://forms.gle/KSS8vbrkVL6VTKLp6",
        stipend: "₹5,000 / month"
      }
    ]
  },
  
  {
    id: "hnt",
    name: "HNT",
    logo: "/logos/HnT Foods - Logo.png",
    industry: "Food & Beverage",
    shortDescription: "Internship opportunity in sales and business development for a fast-growing food brand.",
    deadline: "30 March, 2026, 8:00 PM",
    roles: [
      {
        id: "sales-business-development-intern",
        title: "Sales & Business Development Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/HnT%20Foods%20-%20Sales%20%26%20Business%20Development.pdf",
        applyLink: "https://forms.gle/LvdJFVgunwKfpJ9X8",
        stipend: "₹5,000 / month"
      }
    ]
  },
  {
    id: "audix",
    name: "Audix",
    logo: "/logos/Audix - Logo.png",
    industry: "Business Services",
    shortDescription: "Internship opening in business development for growth and partnerships.",
    deadline: "30 March, 2026, 8:00 PM",
    roles: [
      {
        id: "business-development-associate",
        title: "Business Development Associate",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Audix%20-%20Business%20Development%20Associate.pdf",
        applyLink: "https://forms.gle/hiNj2ir63KWDnchj6",
        stipend: "₹10,000 - ₹15,000 / month"
      }
    ]
  },
  {
    id: "secmark",
    name: "SecMark",
    logo: "/logos/SecMark - Logo.png",
    industry: "Digital Marketing & Business Development",
    shortDescription: "Internship opportunities in digital marketing and business development roles.",
    deadline: "30 March, 2026, 8:00 PM",
    roles: [
      {
        id: "digital-marketing-intern",
        title: "Digital  Marketing Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/SecMark%20-%20Digital%20Marketing.pdf",
        applyLink: "https://forms.gle/Pje6xx1cWrbUPBVB7",
        stipend: "₹5,000 / month"
      },
      {
        id: "business-development-intern",
        title: "Business Development Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/SecMark%20-%20Business%20Development.pdf",
        applyLink: "https://forms.gle/Pje6xx1cWrbUPBVB7",
        stipend: "₹5,000 / month"
      }
    ]
  },

  {
    id: "vignesh-inc",
    name: "Vignesh Inc",
    logo: "/logos/Vighnesh INC - Logo.png",
    industry: "XR, AI & Creative Technology",
    shortDescription: "Internship openings across Unity/AR/VR development, CV/ML research, and creative leadership.",
    deadline: "Closed",
    roles: [
      {
        id: "unity-ar-vr-developer-intern",
        title: "Unity/AR/VR Developer Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Vighnesh%20INC%20-%20All%20Job%20Descriptions.pdf",
        applyLink: "http://forms.gle/HAe1me3onP54ZzyJ9",
        stipend: "Up to ₹8,000 / month"
      },
      {
        id: "cv-ml-research-intern",
        title: "CV/ML Research Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Vighnesh%20INC%20-%20All%20Job%20Descriptions.pdf",
        applyLink: "http://forms.gle/HAe1me3onP54ZzyJ9",
        stipend: "Up to ₹8,000 / month"
      },
      {
        id: "creative-lead",
        title: "Creative Lead",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Vighnesh%20INC%20-%20All%20Job%20Descriptions.pdf",
        applyLink: "http://forms.gle/HAe1me3onP54ZzyJ9",
        stipend: "Up to ₹8,000 / month"
      },
      {
        id: "software-analyst",
        title: "Software Analyst",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Vighnesh%20INC%20-%20All%20Job%20Descriptions.pdf",
        applyLink: "http://forms.gle/HAe1me3onP54ZzyJ9",
        stipend: "Up to ₹8,000 / month"
      }
    ]
  },

  
  {
    id: "florencia-paris",
    name: "Florencia Paris",
    logo: "/logos/Florencia Paris.png",
    industry: "Luxury Retail",
    shortDescription: "Social media focused internship opportunity in fashion and retail.",
    deadline: "30 March, 2026, 8:00 PM",
    roles: [
      {
        id: "social-media-intern",
        title: "Social Media Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Florencia%20Paris%20-%20Social%20Media.pdf",
        applyLink: "https://forms.gle/NWNZonUEaxUdamBm8",
        stipend: "₹6,000- ₹10,000 / month"
      }
    ]
  },

   {
     id: "nexaflo-automation",
     name: "Nexaflo Automation",
     logo: "/logos/NexaFlo Automations - Logo.png",
     industry: "AI & Automation",
     shortDescription: "AI-focused internship opportunity in intelligent automation solutions.",
     deadline: "31st March 2026, 12:00 PM",
     roles: [
       {
         id: "ai-intern",
         title: "AI Intern",
         deadline: "11:00 PM Today",
         jdPdf: "/Job%20Description/NexaFlo%20Automations%20-%20AI%20Intern.pdf",
         applyLink: "https://forms.gle/DH9hfgDbeQrHn9ZQ6",
         stipend: "Performance Based"
       },
       {
         id: "web-dev-intern",
         title: "Web Dev Intern",
         deadline: "11:00 PM Today",
         jdPdf: "/Job%20Description/NexaFlo%20-%20WebDevIntern.pdf",
         applyLink: "https://forms.gle/DH9hfgDbeQrHn9ZQ6",
         stipend: "Performance Based"
       }
     ]
   },

   {
    id: "paryatech",
    name: "ParyaTech",
    logo: "/logos/Paryatech logo.jpeg",
    industry: "Technology",
    shortDescription: "Internship opportunities across engineering and product design tracks.",
    deadline: "31st March 2026, 6:00 PM",
    roles: [
      {
        id: "engineering-intern",
        title: "Engineering Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/ParyaTech%20-%20Engineering%20Intern.pdf",
        applyLink: "https://forms.gle/ytR4SfGZa5qF1WQf8",
        stipend: "₹10,000 / month"
      },
      {
        id: "ui-ux-intern",
        title: "UI/UX Intern",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/ParyaTech%20-%20UI-UX%20Intern.pdf",
        applyLink: "https://forms.gle/ytR4SfGZa5qF1WQf8",
        stipend: "₹10,000 / month"
      }
    ]
  },
  {
    id: "adbureau-analytics",
    name: "Adbureau Analytics",
    logo: "/logos/Adbureau -Logo.png",
    industry: "AI, Automation & Market Intelligence",
    shortDescription: "Internship opportunities across AI engineering, automation systems, and growth intelligence roles.",
    deadline: "31st March 2026, 9:00 PM",
    roles: [
      {
        id: "ai-outreach-engineer-intern",
        title: "AI Outreach Engineer",
        roleType: "tech",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Adbureau%20-%20AI%20Outreach%20Engineer.pdf",
        applyLink: "https://forms.gle/3SUJzTYHa6DfGLG77",
        stipend: "₹5,000 - ₹25,000 (Performance Based)"
      },
      {
        id: "automation-systems-engineer-intern",
        title: "Automation & Systems Engineer",
        roleType: "tech",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Adbureau%20-%20Automation%20%26%20Systems%20Engineer.pdf",
        applyLink: "https://forms.gle/3SUJzTYHa6DfGLG77",
        stipend: "₹5,000 - ₹25,000 (Performance Based)"
      },
      {
        id: "d2c-market-intelligence-analyst-intern",
        title: "D2C Market Intelligence Analyst",
        roleType: "non-tech",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Adbureau%20-%20D2C%20Market%20Intelligence%20Analyst.pdf",
        applyLink: "https://forms.gle/3SUJzTYHa6DfGLG77",
        stipend: "₹5,000 - ₹25,000 (Performance Based)"
      },
      {
        id: "gtm-research-analyst-intern",
        title: "GTM Research Analyst",
        roleType: "non-tech",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Adbureau%20-%20GTM%20Research%20Analyst.pdf",
        applyLink: "https://forms.gle/3SUJzTYHa6DfGLG77",
        stipend: "₹5,000 - ₹25,000 (Performance Based)"
      },
      {
        id: "lead-data-enrichment-crm-associate-intern",
        title: "Lead Data Enrichment CRM Associate",
        roleType: "non-tech",
        deadline: "11:00 PM Today",
        jdPdf: "/Job%20Description/Adbureau%20-%20Lead%20Data%20Enrichment%20CRM%20Associate.pdf",
        applyLink: "https://forms.gle/3SUJzTYHa6DfGLG77",
        stipend: "₹5,000 - ₹25,000 (Performance Based)"
      }
    ]
  }
  
  
];
export const mockCompanies: Company[] = baseCompanies.map((company) => {
  const deadline = company.deadline;

  return {
    ...company,
    roles: company.roles.map((role) => ({
      ...role,
      deadline: deadline ?? role.deadline,
    })),
  };
});
