import { axiosInstance } from "./axiosInstance";

//dodaj blog
export const AddPost = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/posts/add-post", payload);
        return response.data;
    } catch(error) {
        throw error;
    }
};

// dohvati sve blogove
export const GetAllPosts = async () => {
    try {
      const response = await axiosInstance.get("/api/posts/get-all-posts");
      return response.data;
    } catch (error) {
      throw error;
    }
  };


// izmeni blog
export const UpdatePost = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/posts/update-post/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// obriši blog
export const DeletePost = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/posts/delete-post/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// dohvati blog po id-ju
export const GetPostById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/posts/get-post-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};