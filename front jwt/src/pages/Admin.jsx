// Rota protegida por RequireAuth + RequireRole('admin').
import { useEffect, useState } from "react";
import { http } from "../api/http";
import ButtonRegEvent from "../components/ButtonRegEvent";
import "../styles/Admin.css"

export default function Admin() {
  const [msg, setMsg] = useState("Carregando...");

  useEffect(() => {
    http
      .get("/protected/admin")
      .then(({ data }) => setMsg(data.message)) // ex.: "Bem-vindo à área admin, email"
      .catch(() => setMsg("Acesso negado"));
  }, []);
  return (
    <div className="admin-container">
      <section className="admin-header">
        <h1>Área Administrativa</h1>
        <p className="welcome-message">{msg}</p>
      </section>

      <div className="admin-actions">
        <h2>Gerenciamento de Eventos</h2>
        <div className="admin-buttons">
          <ButtonRegEvent />
        </div>
      </div>
    </div>
  );
}
