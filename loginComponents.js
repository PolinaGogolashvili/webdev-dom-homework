export function renderLoginComponent({ appEl, setToken, renderApp }) {
  const appHtml = `
<div class="authorization-form">
  <h3 class="authorization-form-title">Форма входа</h3>
  <div class="authorization-input-container">
    Логин
    <input
      type="text"
      class="authorization-form-name"
      id="login-input"
    />
    <br />
    Пароль
    <input
      type="text"
      class="authorization-form-name"
      id="login-input"
    />
    <br />
  </div>
  <div class="add-form-row">
    <button class="add-form-button" id="login-button">Войти</button>
  </div>
</div>
</div>`;

  appEl.innerHTML = appHtml;

  document.getElementById("login-button").addEventListener("click", () => {
    setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
    renderApp();
  });
}
