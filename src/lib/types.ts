
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Folder {
  id: string;
  name: string;
}

export interface Document {
  id: string;
  title: string;
  folderId: string;
  content: string;
  createdAt: string;
}

export type QaPair = {
    question: string;
    answer: string;
    sources: string[];
};
