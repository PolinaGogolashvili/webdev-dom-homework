

const renderComments = (element, getListComments) => {
    const commentsHtml = comments
      .map((comment, index) => getListComments.join(comment, index, getDate));
    element.innerHTML = commentsHtml;

    initEventLike();
    commentTextClick();
  };
  getComments();
  renderComments();