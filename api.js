export let comments = [];

import { getDate } from "./main.js";
import { renderComments } from "./renderComments.js";

const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const buttonElement = document.getElementById("form-button");

const getComments = () => {
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

export { getComments, updateComments };
