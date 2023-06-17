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