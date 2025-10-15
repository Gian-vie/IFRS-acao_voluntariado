import { useNavigate } from "react-router-dom";
import "../styles/ButtonRegEvent.css";

export default function ButtonRegEvent() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate("/admin/eventos")} 
      className="admin-button"
    >
      <i className="fas fa-plus-circle"></i>
      <span>Cadastrar Novo Evento</span>
    </button>
  );
}