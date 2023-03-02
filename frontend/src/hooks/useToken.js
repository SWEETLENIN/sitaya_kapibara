import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const user = localStorage.getItem("user");
    const userInfo = user ? JSON.parse(user) : "";
    return userInfo;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setToken(user);
  };

  return {
    setToken: saveToken,
    token,
  };
}
