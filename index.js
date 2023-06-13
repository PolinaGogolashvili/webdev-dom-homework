"use strict";

let comments = [];

const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const buttonElement = document.getElementById("form-button");

const commentElements = document.querySelectorAll(".comment");

function getDate(date) {
  let currentDate = new Date(date);
  let month = Number(currentDate.getMonth() + 1);
  let minute = currentDate.getMinutes();
  let year = String(currentDate.getFullYear());
  year = year.split("").splice(2, 3).join("");

  if (month < 10) {
    month = "0" + month;
  }

  if (minute < 10) {
    minute = "0" + minute;
  }

  return (
    currentDate.getDate() +
    "." +
    month +
    "." +
    year +
    " " +
    currentDate.getHours() +
    ":" +
    minute
  );
}
getDate();

const getComments = () => {
  listElement.textContent = "Загружаю комментарии...";
  return fetch("https://wedev-api.sky.pro/api/v1/polina-gogol/comments", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: getDate(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });

      comments = appComments;
      renderComments();
    });
};
getComments();

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

      renderComments();
    });
  }
};

initEventLike();

const commentTextClick = () => {
  const textClickElements = document.querySelectorAll(".comment");

  for (const textClickElement of textClickElements) {
    textClickElement.addEventListener("click", (event) => {
      event.stopPropagation();

      const index = textClickElement.dataset.index;
      const comment = comments[index];

      commentInputElement.value = `< ${comment.text}\n${comment.name}`;

      renderComments();
    });
  }
};

commentTextClick();

const renderComments = () => {
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

  listElement.innerHTML = commentsHtml;
  initEventLike();
  commentTextClick();
};
getComments();
renderComments();

buttonElement.addEventListener("click", () => {
  buttonElement.disabled = true;
  buttonElement.textContent = "Комментарий добавляется";
  function updateComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/polina-gogol/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value,
        text: commentInputElement.value,
        forceError: true,
      }),
    })
      .then((response) => {
        if (response.status === 400) {
          throw new Error("Плохой запрос");
        } else if (response.status === 500) {
          throw new Error("Сервер упал");
        } else {
          return response.json();
        }
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
        } else if (error.message === "Сервер упал") {
          alert("Сервер сломался, попробуй позже");
        }
        console.warn(error);
      });
  }

  updateComments();
  getComments();
  renderComments();

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

  renderComments();
});
