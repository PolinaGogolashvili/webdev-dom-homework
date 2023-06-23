import { getDate } from "./helper.js";
const host = "https://wedev-api.sky.pro/api/v2/polina-gogol/comments";
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

export const getComments = () => {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      }
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

      return appComments;
    });
};

export const addComment = ({text}) => {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Плохой запрос");
    } else if (response.status === 500) {
      throw new Error("Сервер упал");
    } else {
      return response.json();
    }
  });
};

// export let comments = [];

// const host = "https://wedev-api.sky.pro/api/v2/polina-gogol/comments"

// const nameInputElement = document.getElementById("name-input");
// const commentInputElement = document.getElementById("comment-input");
// const buttonElement = document.getElementById("form-button");

// let token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";

// const getComments = ({token}) => {
//   return fetch(host, {
//     method: "GET",
//     headers: {
//       Authorization: token,
//     },
//   })
//     .then((response) => {
//       if (response.status === 401) {
//         throw new Error("Нет авторизации");
//       }
//       if (response.status === 500) {
//         throw new Error("Сервер сломался");
//       }
//         return response.json();
//     })
//     .then((responseData) => {
//       const appComments = responseData.comments.map((comment) => {
//         return {
//           name: comment.author.name,
//           date: new Date(comment.date),
//           text: comment.text,
//           likes: comment.likes,
//           isLiked: false,
//         };
//       });

//       comments = appComments;
//       // renderComments();
//     });
// };

// function updateComments() {
//   return fetch(host, {
//     method: "POST",
//     body: JSON.stringify({
//       name: nameInputElement.value,
//       text: commentInputElement.value,
//     }),
//   })
//     .then((response) => {
//       if (response.status === 400) {
//         throw new Error("Плохой запрос");
//       } else if (response.status === 500) {
//         throw new Error("Сервер упал");
//       } else {
//         return response.json();
//       }
//     })
//     .then(() => {
//       buttonElement.disabled = true;
//       buttonElement.textContent = "Загружаю список";
//       return getComments();
//     })
//     .then(() => {
//       buttonElement.disabled = false;
//       buttonElement.textContent = "Написать";
//       nameInputElement.value = "";
//       commentInputElement.value = "";
//     })
//     .catch((error) => {
//       buttonElement.disabled = false;
//       buttonElement.textContent = "Написать";
//       if (error.message === "Плохой запрос") {
//         alert("Имя и комментарий должны быть не короче 3 символов");
//       } else if (error.message === "Сервер упал") {
//         alert("Сервер сломался, попробуй позже");
//       }
//       console.warn(error);
//     });
// }

// export { getComments, updateComments };
