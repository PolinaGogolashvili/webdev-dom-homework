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
  const fetchPromise = fetch(
    "https://wedev-api.sky.pro/api/v1/polina-gogol/comments",
    {
      method: "GET",
    }
  );

  fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
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


  // comments.push({
  //   name: nameInputElement.value
  //     .replaceAll("<", "&lt;")
  //     .replaceAll(">", "&gt;")
  //     .replaceAll("&", "&amp;")
  //     .replaceAll('"', "&quot;"),
  //   time: getDate(comment.date),
  //   text: commentInputElement.value
  //     .replaceAll("<", "&lt;")
  //     .replaceAll(">", "&gt;")
  //     .replaceAll("&", "&amp;")
  //     .replaceAll('"', "&quot;"),
  //   likes: "0",
  //   isLiked: false,
  // });

  function updateComments() {
    fetch("https://wedev-api.sky.pro/api/v1/polina-gogol/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value,
        text: commentInputElement.value,
      }),
    }).then((response) => {
      response.json().then((responseData) => {
        fetch("https://wedev-api.sky.pro/api/v1/polina-gogol/comments").then(
          (response) => {
            response.json().then((responseData) => {
              comments = responseData.comments;
              getComments();
              renderComments();
            });
          }
        );
      });
    });
  }

  updateComments();
  renderComments();

  nameInputElement.value = "";
  commentInputElement.value = "";
});
