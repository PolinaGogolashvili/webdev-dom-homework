import { getDate } from "./main.js";
import { initEventLike } from "./main.js";
import { commentTextClick } from "./main.js";

const renderComments = (element, getListComments) => {
  const commentsHtml = comments.map((comment, index) =>
    getListComments.join(comment, index, getDate)
  );
  element.innerHTML = commentsHtml;

  initEventLike();
  commentTextClick();
};

export { renderComments };
