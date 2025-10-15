import { useEffect, useState } from "react";
import { http } from "../api/http";
import { useNavigate } from "react-router-dom";

export default function EventList() {
  const navigate = useNavigate(); // Adicione esta linha
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleEventClick = (id) => {
    navigate(`/public/event-list/${id}`);
  };

  useEffect(() => {
    async function fetchEventos() {
      try {
        const res = await http.get("/public/event-list");
        setEventos(res.data);
      } catch (err) {
        setError("Erro ao buscar eventos.");
      } finally {
        setLoading(false);
      }
    }
    fetchEventos();
  }, []);

  if (loading) return <div>Carregando eventos...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (eventos.length === 0) return <div>Nenhum evento cadastrado.</div>;

  return (
    <div className="events-container">
      <h2 className="events-title">Eventos Disponíveis</h2>
      <ul className="events-grid">
        {eventos.map((ev) => (
          <li
            key={ev.id}
            className="event-card"
            onClick={() => handleEventClick(ev.id)}
          >
            <div className="event-content">
              <h3 className="event-title">{ev.titulo}</h3>
              <p className="event-description">{ev.descricao}</p>
              <div className="event-details">
                <span className="event-date">
                  <i className="far fa-calendar"></i> 
                  {ev.data}
                </span>
                <span className="event-time">
                  <i className="far fa-clock"></i> 
                  {ev.hora}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
