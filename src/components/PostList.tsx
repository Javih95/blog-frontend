import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/postlist.css';
import type { PostType } from '../types/Post';


const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
    useEffect(() => {
    fetch(`https://blog-backend-yvk6.onrender.com/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);



  return (
    <div className="post-list">
      <h2>Entradas Recientes</h2>
      {posts.length === 0 ? (
        <p>No hay posts aún.</p>
      ) : (
        <div className="post-grid">
          {posts.map(post => (
            <Link to={`/post/${post._id}`} key={post._id} className="post-card">
              {post.coverImage && (
                <img src={post.coverImage} alt={post.title} className="post-cover" />
              )}
              <h3>{post.title}</h3>
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
              <small>Autor: {post.author}</small>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
