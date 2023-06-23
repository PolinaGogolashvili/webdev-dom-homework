"use strict";

import { getComments, addComment } from "./api.js";
import { renderLoginComponent } from "./loginComponents.js";

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;
let comments = [];

const initEventLike = () => {
  const likePressButtonsElements = document.querySelectorAll(".like-button");
  for (const likePressButtonsElement of likePressButtonsElements) {
    likePressButtonsElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likePressButtonsElement.dataset.index;
      const comment = comments[index];

      likePressButtonsElements[comment.isLiked];
      comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
      comment.isLiked = comment.isLiked ? false : true;

      renderApp();
    });
  }
};

const commentTextClick = () => {
  const textClickElements = document.querySelectorAll(".comment");

  for (const textClickElement of textClickElements) {
    textClickElement.addEventListener("click", (event) => {
      event.stopPropagation();

      const index = textClickElement.dataset.index;
      const comment = comments[index];

      commentInputElement.value = `< ${comment.text}\n${comment.name}`;

      renderApp();
    });
  }
};

const renderApp = () => {
  const appEl = document.getElementById("app");

  if (!token) {
    renderLoginComponent({
      appEl,
      setToken: (newToken) => {
        token = newToken;
      },
      renderApp,
    });

    return;
  }

  const commentsHtml = comments
    .map((comment, index) => {
      return `<li data-index="${index}" class="comment">
<div class="comment-header">
<div class="comment-name">${comment.name}</div>
<div>${comment.date}</div>
</div>
<div class="comment-body">
<div class="comment-text">
 ${comment.text}
</div>
</div>
<div class="comment-footer">
<div class="likes">
  <span class="likes-counter">${comment.likes}</span>
  <button data-index="${index}" class="like-button ${
        comment.isLiked ? "-active-like" : ""
      }"></button>
</div>
</div>
</li>`;
    })
    .join("");

  const appHtml = `<div class="container">
<ul class="comments" id="list">
  <!-- Список рендерится из JS -->
${commentsHtml}
</ul>

<div class="add-form">
  <input
    type="text"
    class="add-form-name"
    id="name-input"
    placeholder="Введите ваше имя"
  />
  <textarea
    type="textarea"
    class="add-form-text"
    id="comment-input"
    placeholder="Введите ваш комментарий"
    rows="4"
  ></textarea>
  <div class="add-form-row">
    <button class="add-form-button" id="form-button">Написать</button>
  </div>
</div>
</div>`;

  appEl.innerHTML = appHtml;
  const listElement = document.getElementById("list");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  const buttonElement = document.querySelector(".add-form-button");
  const commentElements = document.querySelectorAll(".comment");

  // TODO: разобраться почему не работает обработчик собьітий

  buttonElement.addEventListener("click", () => {
    buttonElement.disabled = true;
    buttonElement.textContent = "Комментарий добавляется";
    addComment({
      text: commentInputElement.value,
      token,
    })
      .then(() => {
        buttonElement.disabled = true;
        buttonElement.textContent = "Загружаю список";
        return getComments();
      })
      .then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        nameInputElement.value = "";
        commentInputElement.value = "";
      })
      .catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        if (error.message === "Плохой запрос") {
          alert("Имя и комментарий должны быть не короче 3 символов");
          return;
        }
        if (error.message === "Сервер упал") {
          alert("Сервер сломался, попробуй позже");
          return;
        } else {
          alert("Похоже, у вас пропал интернет");
        }
        console.warn(error);
      });

    getComments();
    renderApp();

    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");

    if (nameInputElement.value === "" && commentInputElement.value === "") {
      nameInputElement.classList.add("error");
      commentInputElement.classList.add("error");
      return;
    } else if (nameInputElement.value === "") {
      nameInputElement.classList.add("error");
      return;
    } else if (commentInputElement.value === "") {
      commentInputElement.classList.add("error");
      return;
    }

    renderApp();
  });

  initEventLike();
  commentTextClick();
};
getComments().then((data) => {
  comments = data;
  renderApp();
});
