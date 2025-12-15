import React, { createContext, useEffect, useState } from "react";
import { getLoggedUserData } from "../Services/AuthSurvices";
export const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userdata, setuserdata] = useState("");
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [isLoading, setisLoading] = useState(false);

  async function getUserData() {
    try {
      setisLoading(true);
      const { data } = await getLoggedUserData();
      setuserdata(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <userContext.Provider value={{ userdata, isLoading }}>
      {children}
    </userContext.Provider>
  );
}
