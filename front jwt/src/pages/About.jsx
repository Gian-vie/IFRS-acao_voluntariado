// Página pública que descreve o propósito do sistema.
export default function About() {
  return (
    <section className="card">
    <div className="about-container">
      <h1>Sobre o Sistema de Ação Voluntariado IFRS</h1>
      
      <section className="about-content">
        <h2>Objetivo</h2>
        <p>
          O Sistema de Ação Voluntariado IFRS é uma plataforma desenvolvida para facilitar 
          e promover o engajamento da comunidade acadêmica em ações voluntárias. 
          Permite que administradores cadastrem eventos de voluntariado e que usuários 
          possam se inscrever como voluntários, criando uma ponte entre as necessidades 
          da comunidade e pessoas dispostas a ajudar.
        </p>

        <h2>Tecnologias Utilizadas</h2>
        <ul>
          <li><strong>Frontend:</strong> React.js, React Router, Context API</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Banco de Dados:</strong> MySQL</li>
          <li><strong>Autenticação:</strong> JWT (JSON Web Tokens)</li>
        </ul>

        <h2>Funcionalidades Principais</h2>
        <ul>
          <li>Cadastro e autenticação de usuários</li>
          <li>Gerenciamento de eventos de voluntariado</li>
          <li>Sistema de inscrição em eventos</li>
          <li>Área administrativa para gestão de eventos</li>
        </ul>
      </section>
    </div>
    </section>
  );
}
