import axios from "axios";
import { UserProps } from "@/types";

export const createDocument = async (user: UserProps) => {
  try {
    const response = await axios.post("http://localhost:8000/api/documents", {
      owner: user?._id,
    });
    return response.data._id;
  } catch (error) {
    console.error("Failed to create document:", error);
  }
};
