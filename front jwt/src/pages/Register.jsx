import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../api/http";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setError("");
    setLoading(true);

    try {
      await http.post("/auth/register", {
        email: form.email,
        password: form.password,
        role: form.isAdmin ? "admin" : "user",
      });
      navigate("/login", {
        state: {
          message: "Conta criada com sucesso! Faça login para continuar.",
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h1>Criar Conta</h1>
      {error && <p className="alert">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <FormInput
          label="E-mail"
          type="email"
          name="email"
          value={form.email}
          placeholder="usuario@ifrs.edu.br"
          onChange={updateField}
          required
        />
        <FormInput
          label="Senha"
          type="password"
          name="password"
          value={form.password}
          placeholder="••••••"
          onChange={updateField}
          required
        />
        <FormInput
          label="Confirmar Senha"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          placeholder="••••••"
          onChange={updateField}
          required
        />
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="isAdmin"
            checked={form.isAdmin}
            onChange={updateField}
          />
          <label>Conta de Administrador</label>
        </div>
        <div className="button-group">
          <Button type="submit" disabled={loading} className="btn">
            {loading ? "Criando..." : "Criar Conta"}
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/login")}
            className="btn btn-secondary"
          >
            Voltar
          </Button>
        </div>
      </form>
    </section>
  );
}
