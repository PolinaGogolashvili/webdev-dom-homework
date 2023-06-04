"use strict";

    const listElement = document.getElementById("list");
    const nameInputElement = document.getElementById("name-input");
    const commentInputElement = document.getElementById("comment-input");
    const buttonElement = document.getElementById("form-button");

    buttonElement.addEventListener("click", () => {
      nameInputElement.classList.remove("error");
      commentInputElement.classList.remove("error");

      if (nameInputElement.value === "" && commentInputElement.value === "") {
        nameInputElement.classList.add("error");
        commentInputElement.classList.add("error");
        return;
      } else if(nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
      } else if(commentInputElement.value === "") {
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

      listElement.innerHTML =
        oldListHtml +
        `<li class="comment">
             <div class="comment-header">
               <div>${nameInputElement.value}</div>
               <div>${newDate}</div>
             </div>
             <div class="comment-body">
               <div class="comment-text">
                ${commentInputElement.value}
               </div>
             </div>
             <div class="comment-footer">
               <div class="likes">
                 <span class="likes-counter">0</span>
                 <button class="like-button"></button>
               </div>
             </div>
           </li>`;

      nameInputElement.value = "";
      commentInputElement.value = "";
    });

    console.log("It works!");