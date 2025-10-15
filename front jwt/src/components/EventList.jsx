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
    <div>
      <h2>Lista de Eventos</h2>
      <ul>
        {eventos.map((ev) => (
          <li
            key={ev.id}
            onClick={() => handleEventClick(ev.id)}
            style={{
              cursor: "pointer",
              padding: "10px",
              margin: "5px 0",
              border: "1px solid #ddd",
              borderRadius: "4px",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#f5f5f5")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <div>
              <strong>{ev.titulo}</strong> <br />
              {ev.descricao} <br />
              Data: {ev.data} <br />
              Hora: {ev.hora}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
