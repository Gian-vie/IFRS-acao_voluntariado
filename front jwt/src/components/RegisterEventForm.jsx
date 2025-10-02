import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function RegisterEventForm() {
  const { registerEvent, user } = useAuth();
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    data: "",
    hora: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!user || user.role !== "admin") {
    return <div>Você não tem permissão para registrar eventos.</div>;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await registerEvent(form);
      setSuccess("Evento registrado com sucesso!");
      setForm({ titulo: "", descricao: "", data: "", hora: "" });
    } catch (err) {
      setError(err.message || "Erro ao registrar evento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Registrar Novo Evento</h2>
      <div>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Data:</label>
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Hora:</label>
        <input
          type="time"
          name="hora"
          value={form.hora}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading} className="btn">
        {loading ? "Registrando..." : "Registrar Evento"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
    </form>
  );
}
