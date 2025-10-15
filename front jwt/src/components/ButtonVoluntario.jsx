import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Adicione esta importação
import { http } from "../api/http";
import { useEffect, useState } from "react";

export default function ButtonVoluntario() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [inscricaoStatus, setInscricaoStatus] = useState("");
  const [isInscrito, setIsInscrito] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verifica se o usuário já está inscrito quando o componente carrega
  useEffect(() => {
    async function checkInscricao() {
      if (!user || !id) {
        setLoading(false);
        return;
      }

      try {
        const response = await http.get(`/protected/eventos/${id}/inscricao`);
        setIsInscrito(response.data.inscrito);
      } catch (err) {
        console.error("Erro ao verificar inscrição:", err);
      } finally {
        setLoading(false);
      }
    }

    checkInscricao();
  }, [user, id, isInscrito]);

  const handleVoluntariar = async () => {
    if (!user || !user.id) {
      console.log("User data:", user); // Debug user object
      navigate("/login");
      return;
    }

    try {
      const response = await http.post(`/protected/eventos/${id}/inscricao`, {
        id_usuario: user.id, // Send user ID in request body
      });
      console.log("Response:", response.data); // Debug response
      setInscricaoStatus("Inscrição realizada com sucesso!");
      setIsInscrito(true);
    } catch (err) {
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        user: user,
      });
      setInscricaoStatus(
        err.response?.data?.message || "Erro ao realizar inscrição"
      );
    }
  };

  if (loading) {
    return <div>Verificando inscrição...</div>;
  }

  if (isInscrito) {
    return (
      <div className="volunteer-section">
        <button className="volunteer-button" disabled>
          Você já está inscrito neste evento!
        </button>
      </div>
    );
  }

  return (
    <div className="volunteer-section">
      <button
        onClick={handleVoluntariar}
        className="volunteer-button"
        disabled={!user}
      >
        {user ? "Quero ser voluntário!" : "Faça login para se inscrever"}
      </button>
      {inscricaoStatus && (
        <p
          className={
            inscricaoStatus.includes("erro")
              ? "error-message"
              : "success-message"
          }
        >
          {inscricaoStatus}
        </p>
      )}
    </div>
  );
}
