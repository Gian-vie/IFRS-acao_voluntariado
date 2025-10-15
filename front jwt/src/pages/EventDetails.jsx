import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { http } from "../api/http";
import ButtonVoluntario from "../components/ButtonVoluntario";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvento() {
      try {
        const response = await http.get(`/public/event-list/${id}`);
        setEvento(response.data[0]);
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao carregar evento");
      } finally {
        setLoading(false);
      }
    }
    fetchEvento();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!evento) return <div>Evento não encontrado</div>;

  return (
    <div className="container">
      <button 
        onClick={() => navigate(-1)}
        className="back-button"
      >
        Voltar
      </button>

      <article className="event-details">
        <h1>{evento.titulo}</h1>
        <div className="event-info">
          <p><strong>Data:</strong> {evento.data}</p>
          <p><strong>Hora:</strong> {evento.hora}</p>
        </div>
        <div className="event-description">
          <h2>Descrição</h2>
          <p>{evento.descricao}</p>
        </div>
        <ButtonVoluntario/>
      </article>
    </div>
  );
}