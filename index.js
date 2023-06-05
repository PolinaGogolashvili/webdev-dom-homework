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
    likes: "3",
    isLiked: false,
  },
  {
    name: "Варвара Н.",
    time: "13.02.22 19:22",
    text: "Мне нравится как оформлена эта страница! ❤",
    likes: "75",
    isLiked: true,
  },
];

const likePressButtonsElement = document.querySelectorAll(".like-button");
const likesCounterElements = document.querySelectorAll(".likes-counter");
let likesCounterElement = Number.parseInt(likesCounterElement.textContent, 10);
let isLiked = false;

const initEventLike = () => {
      if (!isLiked) {
        likePressButtonsElement.classList.add("-active-like");
        likesCounterElement++;
        likesCounterElements.textContent = likesCounterElement;
        isLiked = !isLiked; 
      } else {
        likePressButtonsElement.classList.remove("-active-like");
        likesCounterElement--;
        likesCounterElements.textContent = likesCounterElement;
        isLiked = !isLiked;
      }
};

initEventLike.addEventListener('click', likeClick);

const renderComments = () => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li class="comment">
<div class="comment-header">
  <div>${comment.name}</div>
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
    <button data-index="${index}" class="like-button"></button>
  </div>
</div>
</li>`;
    })
    .join("");

  listElement.innerHTML = commentsHtml;
  initEventLike.addEventListener('click', likeClick);
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

  const oldListHtml = listElement.innerHTML;
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
    name: nameInputElement.value,
    time: newDate,
    text: commentInputElement.value,
    likes: "0",
    isLiked: false,
  });

  initEventLike();
  renderComments();

  nameInputElement.value = "";
  commentInputElement.value = "";
});

console.log("It works!");
