"use strict";

const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const buttonElement = document.getElementById("form-button");

const commentElements = document.querySelectorAll(".comment");

const comments = [
  {
    name: "Глеб Фокин",
    time: "12.02.22 12:18",
    text: "Это будет первый комментарий на этой странице",
    likes: 3,
    isLiked: false,
  },
  {
    name: "Варвара Н.",
    time: "13.02.22 19:22",
    text: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    isLiked: true,
  },
];

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
      const commentText = event.target.closest(".comment-text");
      const commentName = document.querySelector(".comment-name");
      console.log(commentName);
      commentInputElement.value =
        ">" + commentText.textContent + commentName.textContent;

      renderComments();
    });
  }
};

commentTextClick();

const renderComments = () => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li class="comment">
<div class="comment-header">
  <div class="comment-name" data-name="${comment.name}">${comment.name}</div>
  <div>${comment.time}</div>
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
renderComments();

buttonElement.addEventListener("click", () => {
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

  let currentDate = new Date();
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  let day = currentDate.getDate();
  let month = currentDate.getMonth();

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  let newDate =
    day +
    "." +
    month +
    "." +
    currentDate.getFullYear() +
    " " +
    hour +
    ":" +
    minute;

  comments.push({
    name: nameInputElement.value
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;"),
    time: newDate,
    text: commentInputElement.value
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;"),
    likes: "0",
    isLiked: false,
  });

  renderComments();

  nameInputElement.value = "";
  commentInputElement.value = "";
});

console.log("It works!");
