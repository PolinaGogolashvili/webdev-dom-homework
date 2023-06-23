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
      type="password"
      class="authorization-form-name"
      id="password-input"
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
    const login = document.getElementById("login-input").value;
    const password = document.getElementById("password-input").value;

    if (!login) {
      alert("Введите логин");
      return;
    }

    if (!password) {
      alert("Введите пароль");
      return;
    }

    loginUser({
      login: login,
      password: password,
    })
      .then((user) => {
        setToken(`Bearer ${user.user.token}`);
        renderApp();
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}
