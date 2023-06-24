import { loginUser } from "./api.js";
import { registerUser } from "./api.js";

export function renderLoginComponent({ appEl, setToken, renderApp }) {
  let isLoginMode = true;

  const renderForm = () => {
    const appHtml = `<div class = "container"><div class="authorization-form">
    <h3 class="authorization-form-title">Форма ${
      isLoginMode ? "входа" : "регистрации"
    }</h3>
    <div class="authorization-input-container">
  
    ${
      isLoginMode
        ? ""
        : `Имя
    <input
      type="text"
      class="authorization-form-name"
      id="name-input"
    />
    <br />`
    }
  
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
      <button class="add-form-button" id="login-button">${
        isLoginMode ? "Войти" : "Зарегистрироваться"
      }</button>
      <br /><br />
      <button class="add-form-button" id="toggle-button">${
        isLoginMode ? "К регистрации" : "Ко входу"
      }</button>
    </div>
  </div>
  </div></div>
    `;

    appEl.innerHTML = appHtml;

    document.getElementById("login-button").addEventListener("click", () => {
      if (isLoginMode) {
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
      } else {
        const name = document.getElementById("name-input").value;
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;

        if (!name) {
          alert("Введите имя");
          return;
        }

        if (!login) {
          alert("Введите логин");
          return;
        }

        if (!password) {
          alert("Введите пароль");
          return;
        }

        registerUser({
          login: login,
          password: password,
          name: name,
        })
          .then((user) => {
            setToken(`Bearer ${user.user.token}`);
            renderApp();
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    });

    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  };
  renderForm();
}
