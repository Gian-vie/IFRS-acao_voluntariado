import { useNavigate } from "react-router-dom";

export default function ButtonRegEvent() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/admin/eventos")}>
      Cadastrar Novo Evento
    </button>
  );
}