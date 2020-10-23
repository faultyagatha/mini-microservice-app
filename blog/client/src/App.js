import React from 'react';

import PostCreate from './PostCreate';
import PostList from './PostList';

export const App = () => {
  return (
    <div className="container">
      <header>
        <h1>Blog App</h1>
      </header>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
