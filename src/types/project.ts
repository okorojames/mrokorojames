export interface IProject {
  _id: string;
  name: string;
  desc: string;
  stacks: string;
  link: string;
  github?: string;
  image: string;
  imageId?: string;
  topRated: boolean;
  createdAt?: string;
  updatedAt?: string;
}
