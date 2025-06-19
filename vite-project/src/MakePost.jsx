import { useState } from 'react';

function MakePost() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file); // Creates a temp URL to preview
      setImage(imgURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.length > 70) {
      alert('Description must be 70 characters or less.');
      return;
    }

    const newPost = {
      title,
      description,
      image,
    };

    console.log('New Post:', newPost);

    // Save to localStorage or send to backend
    const stored = JSON.parse(localStorage.getItem('my-blogs') || '[]');
    localStorage.setItem('my-blogs', JSON.stringify([...stored, newPost]));

    // Clear form
    setTitle('');
    setDescription('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ color: 'white',  }}>Create a Post</h2>

      <input
        className='image-input'
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginBottom: '10px', }}
      />

      {image && (
        <img
          src={image}
          alt="Preview"
          style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '20px', objectFit: 'cover' }}
        />
      )}

      <div className='headline-input-container'>
        <h2 className='title'
        style={{ marginRight : '10px'}}
        >Add title:</h2>
        <input
          className='headline-input'
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          
        />
      </div>

      <div className='description-container'>
        <h2>Add description</h2>
        <textarea
          className='description'
          placeholder="Enter description (max 70 characters)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={70}
          required
        />

        <p>{description.length}/70 characters</p>
      </div>

      <div className='post-button-container'>
        <button className='post-button' type="submit">
          Post
        </button>
      </div>
    </form>
  );
}

export default MakePost;