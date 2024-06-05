import { ObjectId } from "mongodb";

export interface UserProps {
  _id: ObjectId;
  username: string;
  email: string;
  avatar?: string;
}
