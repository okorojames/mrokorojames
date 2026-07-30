export interface IExperience {
  _id: string;
  company: string;
  position: string;
  product: string;
  from: string;
  to: string;
  description: string[];
  technologies: string[];
  companyLogo?: string;
  companyUrl?: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}
