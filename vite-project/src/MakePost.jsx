import { useState } from 'react';
import { useEditBlog, useSova } from './VijestContext';
import { useEffect } from 'react';

function MakePost({ onClose }) {
  const { setBlogToEdit } = useEditBlog();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, seLink] = useState('');
  const [id, setId] = useState(undefined)
  const { sova, setSova } = useSova();
  
  
  localStorage.clear()
  
  const { blogToEdit } = useEditBlog();

  useEffect(() => {
    if (blogToEdit) {
      setTitle(blogToEdit.title || '');
      setDescription(blogToEdit.description || '');
      setImage(blogToEdit.image || null);
      setId(blogToEdit.id || undefined)
    }
  }, [blogToEdit]);
  


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.length > 70) {
      alert('Description must be 70 characters or less.');
      return;
    }

    
    const newPost = {
      id: id || crypto.randomUUID?.() || Date.now(), 
      title,
      description,
      image,
      url: link.trim() !== '' ? link : null,
    };

    let updated;
    const stored = JSON.parse(localStorage.getItem('my-blogs') || '[]');
  
    if (id) {
      updated = stored.filter(item => item.id !== id);
    }
    else  updated = stored;
    
    localStorage.setItem('my-blogs', JSON.stringify([...updated, newPost]));

    
    setTitle('');
    setDescription('');
    setImage(null);
    onClose();
    setSova([sova[0], sova[1] + 1])
    setBlogToEdit(null);
  };
  
  return (
    
      <form onSubmit={handleSubmit}>
        <div className='x-button-container'>
          <button
            type="button"
            className="close-button"
            onClick={() => {
              onClose();
              setBlogToEdit(null);
            }}
          >
            X
          </button>
        </div>
        <h2 style={{ color: 'white',  }}>Create a Post</h2>

        <div className='image-input-container'>
          <h2 className='image-label'>Upload Image:</h2>
          <label className="custom-file-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="image-input"
            />
          </label>
          {image && (
          <img
            src={image}
            alt="Preview"
            style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '20px', objectFit: 'cover' }}
          />
        )}
        </div>


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

        <div className='external-link-container'>
          <h2>External Link (Optional): </h2>
          <input
            type="url"
            placeholder="https://example.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
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