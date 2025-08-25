import { useState } from 'react';

interface PostFormProps {
  onPostCreated?: () => void; 
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [destacado, setDestacado] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = { title, content, coverImage, author,destacado };

    try {
      const res = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (res.ok) {
        setTitle('');
        setContent('');
        setAuthor('');
        setDestacado(false);
        if (onPostCreated) onPostCreated();
        alert('Post creado con éxito');
      } else {
        alert('Error al crear el post');
      }
    } catch (error) {
      console.error(error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Crear nuevo post</h2>
      <div>
        <label>Título:</label><br />
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contenido:</label><br />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="URL de imagen de portada"
          value={coverImage}
          onChange={e => setCoverImage(e.target.value)}
        />
      </div>
      <div>
        <label>Autor:</label><br />
        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Destacar?:</label><br />
        <input
          type="checkbox"
          checked={destacado}
          onChange={e => setDestacado(e.target.checked)}
        />
      </div>
      <button type="submit">Crear post</button>
    </form>
  );
};

export default PostForm;
