import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:4000/posts', {
      title
    });
    //empty the form
    setTitle('');
  };

  return <div>
    <form onSubmit={ handleSubmit }>
      <div className="form-group">
        <label>Title</label>
        <input
          className="form-control"
          value={ title }
          onChange={ e => setTitle(e.target.value) }
        />
      </div>
      <button className="btn btn-primary">SUBMIT</button>
    </form>
  </div>
}

export default PostCreate;