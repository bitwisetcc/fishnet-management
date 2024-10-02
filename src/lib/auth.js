import { useNavigate } from "react-router-dom";
import { API_URL } from "./query";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../App";

export function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  const { token } = await res.json();

  if (token === undefined) throw Error("Credenciais inválidas");

  localStorage.setItem("token", token);
  console.log("Autenticação completa");
}

export function useAuth() {
  const navigate = useNavigate();
  const setProfile = useContext(ProfileContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
      return () => {};
    }

    fetch(`${API_URL}/auth/check`, { headers: { Authorization: token } })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setProfile(data);
      })
      .catch(() => navigate("/login"));
  }, [navigate, setProfile]);
}

export async function register(user) {
  if (Object.values(user).some((v) => v === ""))
    throw new Error("Cadastro incompleto");

  user.role = "staff";

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    const { token } = await res.json();

    if (token === undefined) return false;

    localStorage.setItem("token", token);
    return true;
  } catch {
    return false;
  }
}
