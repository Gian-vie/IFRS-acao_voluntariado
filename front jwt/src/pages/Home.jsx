import EventList from "../components/EventList";
// Página pública simples de boas-vindas.
export default function Home() {
  return (
    <section className="card">
      <h1>Home</h1>
      <div children="">
      <EventList />

      </div>
    </section>
  );
}
