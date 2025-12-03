// Importa os módulos principais do Selenium WebDriver
// Builder = cria o navegador
// By = seleciona elementos na página (id, class, css etc.)
// until = espera até que uma condição aconteça (ex: elemento aparecer)
import { Builder, By, until } from "selenium-webdriver";
(async function testFormulario() {
  // Inicia o navegador (Chrome, neste caso)
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Abre a aplicação React no navegador
    await driver.get("http://localhost:5173");
    // Localiza o campo de login através do id "login-link"
    const loginNavbar = await driver.findElement(By.id("login-link"));
    const campoEmail = await driver.findElement(By.id("email-input"));
    const campoPassword = await driver.findElement(By.id("password-input"));

    // Localiza o botão de envio pelo ID "botao-enviar"
    const botaoEnviar = await driver.findElement(By.id("botao-enviar"));

    
    await loginNavbar.click();
    await campoEmail.sendKeys("admin@ifrs.edu.br");
    await campoPassword.sendKeys("admin123");
    // Clica no botão "Enviar"
    await botaoEnviar.click();
    // Aguarda até que o elemento com ID "mensagem" apareça na tela (máximo 3s)
    const mensagem = await driver.wait(
      until.elementLocated(By.id("mensagem")),
      3000
    );
    // Obtém o texto exibido na mensagem
    const texto = await mensagem.getText();
    // Exibe o texto no console para conferência
    console.log("Mensagem exibida:", texto);
  } finally {
    // Garante que o navegador será fechado, mesmo se der erro
    await driver.quit();
  }
})();
