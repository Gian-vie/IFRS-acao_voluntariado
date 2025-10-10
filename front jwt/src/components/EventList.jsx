import { useEffect, useState } from "react";
import { http } from "../api/http";

export default function EventList() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <li key={ev.id}>
            <strong>{ev.titulo}</strong> <br />
            {console.log(ev)}
            {ev.descricao} <br />
            Data: {ev.data} <br />
            Hora: {ev.hora}
          </li>
        ))}
      </ul>
    </div>
  );
}
