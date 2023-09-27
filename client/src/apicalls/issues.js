import { axiosInstance } from "./axiosInstance";

// izdavanje knjige
export const IssueBook = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/issues/issue-new-book", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

// dohvatanje zapisa o izdavanju
export const GetIssues = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/issues/get-issues" , payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}

// vraćanje knjige
export const ReturnBook = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/issues/return-book", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}

// brisanje zapisa o izdavanju knjige
export const DeleteIssue = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/issues/delete-issue", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}

// izmenjivanje zapisa o izdavanju knjige
export const EditIssue = async (payload) => {
    try {
      const response = await axiosInstance.post("/api/issues/edit-issue", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
}