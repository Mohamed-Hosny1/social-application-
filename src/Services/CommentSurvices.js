import axios, { Axios } from "axios";
const apiUrl = import.meta.env.VITE_BASE_URL;

export async function createComment(comment) {
  const data = await axios.post(`${apiUrl}/comments`, comment, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function updateComment(comment, commentId) {
  const data = await axios.put(`${apiUrl}/comments/${commentId}`, comment, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function deleteComment(commentId) {
  const data = await axios.delete(`${apiUrl}/comments/${commentId}`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
  return data;
}
export async function postComments(postId) {
  const data = await axios.get(`${apiUrl}/posts/${postId}/comments`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
  return data;
}
