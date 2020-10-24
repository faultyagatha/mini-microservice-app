import React from 'react';


//makes a request to the post service and gets a list of created posts
const CommentList = ({ comments }) => {

  const renderComments = comments.map(comment => {
    return <li key={ comment.id }>{ comment.content }</li>
  });

  return <ul>{ renderComments }</ul>
};

export default CommentList;