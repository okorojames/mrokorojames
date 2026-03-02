export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  product: string;
  from: string;
  to: string;
  description: string[];
}

export const workExperience: WorkExperience[] = [
  {
    id: 1,
    company: "Jekalo Digitals",
    position: "Frontend Developer",
    product: "Connershop, Arc Pay & GroSolar",
    from: "Nov 2023",
    to: "Present",
    description: [
      "Built and maintained three Progressive Web Applications — Connershop & Arc Pay (fintech) and GroSolar (solar power purchase & subscription), ensuring seamless user experiences across all platforms.",
      "Collaborated with Backend developers and designers to ensure the entire project flow is smooth and efficient with great user experience.",
      "Utilized frontend libraries and frameworks (React, Redux, React-Query, etc) to streamline development and enhance user experiences.",
      "Conducted code reviews and collaborated with team members to maintain code quality, consistency, and best practices.",
      "Participated in Agile development processes, contributing to sprint planning, daily stand-ups, and retrospectives to meet project goals and timelines.",
      "Ensured flawless PWA experiences, enabling users to make transfers, deposits, pay bills, borrow loans, and subscribe to solar power plans effortlessly.",
    ],
  },
  {
    id: 2,
    company: "The Pake Group",
    position: "Frontend Developer",
    product: "The pake website",
    from: "Nov 2023",
    to: "Sept 2025",
    description: [
      "Made Sure the design and the functionality is flawless,responsive, and compatible with all devices,",
      "Collaborated with Backend developers and designers to ensurethe entire project flow is smooth and efficient with great user experience,",
      "Utilized frontend libraries and frameworks (React, Redux, React-Query, etc) to streamline development and enhance userexperiences",
      "Conducted code reviews and collaborated with team membersto maintain code quality, consistency, and best practices.",
    ],
  },
  {
    id: 3,
    company: "Heartfelt",
    position: "Frontend Developer",
    product: "Heartfelt Website",
    from: "June 2023",
    to: "July 2023",
    description: [
      "Collaborated with cross-functional teams, including designersand backend developers,",
      "Utilized frontend libraries and frameworks (React, Redux, React-Query, etc) to streamline development and enhance userexperiences",
      "Conducted code reviews and collaborated with team membersto maintain code quality, consistency, and best practices.",
      "Participated in Agile development processes, contributing tosprint planning, daily stand-ups, and retrospectives to meetproject goals and timelines.",
    ],
  },
];
