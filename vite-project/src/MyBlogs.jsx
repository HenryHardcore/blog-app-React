import { useEffect } from 'react';
import { useSova } from './VijestContext';
import { useState } from 'react'
import iconBookmark from './fotografije/icons-bookmark.png';
import iconBookmarkFilled from './fotografije/icons-bookmark-filled.png';


function MyBlogs() {
  const { sova } = useSova();
  const [niz, setNiz] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(
      sova[0] === 'Bookmarks' ? 'bookmarked-urls' : 'my-blogs'
    ) || '[]');
    setNiz(data);

    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarked-urls') || '[]');
    const bookmarksFlags = data.map(article => 
      storedBookmarks.some(bookmarked => bookmarked.url === article.url)
    );
    setBookmarks(bookmarksFlags);
  }, [sova]);

  const toggleDetails = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="my-blogs">
      <h2>{sova[0]}</h2>
      <div className="kontejner">
        {niz.map((article, index) => (
          <div
            className="mala-vijestt"
            key={index}
            onClick={() => toggleDetails(index)}
            style={{
              backgroundImage: `url(${article.urlToImage || './fallback.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="naslovv">
              {activeIndex === index ? (
                <>
                  <p style={{ fontSize: '18px', color: 'aliceblue' }}>
                    {article.description || 'No description available.'}
                  </p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <button className="read-moree">Read More</button>
                  </a>
                </>
              ) : (
                <h2>{article.title || 'No Title'}</h2>
              )}
              <button
                className="bookmark-button"
                onClick={(e) => {
                  e.stopPropagation();
                  const stored = JSON.parse(localStorage.getItem('bookmarked-urls') || '[]');

                  const updated = [...bookmarks];
                  const newStatus = !bookmarks[index];
                  updated[index] = newStatus;
                  setBookmarks(updated);

                  let updatedStored;

                  if (newStatus) {
                    updatedStored = [...stored, article];
                  } else {
                    updatedStored = stored.filter(item => item.url !== article.url);
                  }

                  localStorage.setItem('bookmarked-urls', JSON.stringify(updatedStored));
                }}
                style={{
                  backgroundImage: `url(${bookmarks[index] ? iconBookmarkFilled : iconBookmark})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
              ></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBlogs