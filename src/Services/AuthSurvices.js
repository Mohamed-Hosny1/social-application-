import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_URL;
export async function RegisterForm(UserData) {
  const data = axios.post(`${apiUrl}/users/signup`, UserData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}
export async function loginForm(UserData) {
  const data = axios.post(`${apiUrl}/users/signin`, UserData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}
export async function getLoggedUserData() {
  const data = axios.get(`${apiUrl}/users/profile-data`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });

  return data;
}
