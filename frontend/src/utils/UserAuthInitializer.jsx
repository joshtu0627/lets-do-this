import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { backendurl } from "../constants/urls";

export default function UserAuthInitializer() {
  const { user, login, logout } = useUser();
  useEffect(() => {
    const storage = window.localStorage;
    const token = storage.getItem("token");
    console.log(token);
    fetch(`http://${backendurl}/user/isLoggedIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 將 token 放入 Authorization header 中
      },
    })
      .then((resp) => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(resp);
        return resp.json();
      })
      .then((userData) => {
        console.log(userData);
        login(userData.data);
        console.log("logged in");
      });
  }, []);
  return null; // 不渲染任何 UI 元素
}
