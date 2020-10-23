import React, { useState } from 'react';
import axios from 'axios';

//need an id of the post
const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content
    });
    //empty the form
    setContent('');
  };

  return <div>
    <form onSubmit={ handleSubmit }>
      <div className="form-group">
        <label>New Comment</label>
        <input
          className="form-control"
          value={ content }
          onChange={ e => setContent(e.target.value) }
        />
      </div>
      <button className="btn btn-primary">SUBMIT</button>
    </form>
  </div>
}

export default CommentCreate;