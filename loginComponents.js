import { loginUser } from "./api.js";

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
    loginUser({
      login: "admin",
      password: "admin",
    }).then((user) => {
      console.log(user);
      setToken(`Bearer ${user.user.token}`);
      renderApp();
    });
  });
}
