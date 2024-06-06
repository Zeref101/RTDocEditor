import { ObjectId } from "mongodb";

export interface UserProps {
  _id: ObjectId;
  username: string;
  email: string;
  avatar?: string;
}
export interface Document {
  _id: ObjectId;
  owner: ObjectId;
  lastModified: Date;
  __v: number;
  content: string;
  title: string;
}

export interface CollaborationDocumentProp {
  documentId: Document;
  userId: ObjectId[];
}
