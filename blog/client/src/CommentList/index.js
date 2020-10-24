import React from 'react';


//makes a request to the post service and gets a list of created posts
const CommentList = ({ comments }) => {
  let content;

  const renderComments = comments.map(comment => {
    switch (comment.status) {
      case 'approved': content = comment.content;
        break;
      case 'pending': content = 'Comment is awaiting moderation';
        break;
      case 'rejected': content = 'Comment has been rejected';
        break;
      default: content = 'Comment is awaiting moderation';
    }
    return <li key={ comment.id }>{ content }</li>
  });

  return <ul>{ renderComments }</ul>
};

export default CommentList;