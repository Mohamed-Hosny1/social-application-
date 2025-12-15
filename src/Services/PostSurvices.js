import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_URL;

export async function getAllPosts() {
  const data = await axios.get(`${apiUrl}/posts`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
    params: {
      limit: 60,
      sort: "-createdAt",
    },
  });
  return data;
}
export async function userPosts(userId) {
  const data = await axios.get(`${apiUrl}/users/${userId}/posts`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function getSinglePost(id) {
  const data = await axios.get(`${apiUrl}/posts/${id}`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function createPost(formdata) {
  const data = await axios.post(`${apiUrl}/posts`, formdata, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function updatePost(formdata, userId) {
  const data = await axios.put(`${apiUrl}/posts/${userId}`, formdata, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function deletePost(postId) {
  const data = await axios.delete(`${apiUrl}/posts/${postId}`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
  return data;
}
