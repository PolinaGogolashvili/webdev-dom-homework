const renderComments = () => {
    const commentsHtml = comments
      .map((comment, index) => {
        return 
  
    listElement.innerHTML = commentsHtml;
    initEventLike();
    commentTextClick();
  })};
  getComments();
  renderComments();