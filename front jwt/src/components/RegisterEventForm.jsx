import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function RegisterEventForm() {
  const { user, registerEvent } = useAuth();
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
    <div className="event-form-container">
      <h2 className="event-form-title">Registrar Novo Evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Título:</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Descrição:</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Data:</label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Hora:</label>
          <input
            type="time"
            name="hora"
            value={form.hora}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className="submit-button"
        >
          {loading ? "Registrando..." : "Registrar Evento"}
        </button>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>
    </div>
  );
}