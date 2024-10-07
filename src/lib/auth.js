import { useNavigate } from "react-router-dom";
import { API_URL } from "./query";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../App";

const allowed_roles = ["admin", "staff"];

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
  const { token, role } = await res.json();

  if (token === undefined) throw Error("Credenciais inválidas");
  if (!allowed_roles.includes(role)) throw Error("Cargo inválido");

  localStorage.setItem("token", token);
  console.log("Autenticação completa");
}

export function useAuth(setter = null) {
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
        if (!allowed_roles.includes(data.role)) navigate("/login?error=role")
        setProfile(data);
        if (setter !== null) setter(data);
      })
      .catch(() => navigate("/login"));
  }, [navigate, setProfile, setter]);
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
