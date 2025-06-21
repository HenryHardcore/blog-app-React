import { useState, useEffect, useRef } from 'react';
import { useVijest } from './VijestContext';
import iconBookmark from './fotografije/icons-bookmark.png';
import iconBookmarkFilled from './fotografije/icons-bookmark-filled.png';
import { useSova } from './VijestContext';


function GlavnaVijest({ searchQuery, setSearchQuery }) {
  const [headline, setHeadline] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const { vijest } = useVijest();
  const [bookmark, setBookmark] = useState(false);
  const { sova, setSova } = useSova();



  useEffect(() => {
    async function fetchNews() {
      try {
        let url;

        if (searchQuery && searchQuery.trim() !== '') {
          url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=5f65315585d841a38ddf4e78f42f5f2c`;
        } else { 
          url = `https://newsapi.org/v2/top-headlines?country=us&category=${vijest}&apiKey=5f65315585d841a38ddf4e78f42f5f2c`;
        }
        const res = await fetch(url);
        const data = await res.json();
        const firstArticle = data.articles[0];

        setHeadline(firstArticle.title);
        setImageUrl(firstArticle.urlToImage);
        setDescription(firstArticle.description);
        setUrl(firstArticle.url);

        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked-urls') || '[]');
        const isBookmarked = savedBookmarks.includes(firstArticle.url);
        setBookmark(isBookmarked);

      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    }

    fetchNews();
  }, [vijest, sova[1], searchQuery]);

  function toggleDetails() {
    setShowDetails(prev => !prev);
  };


  return(
  <div className="glavna-vijest"
  onClick={toggleDetails}
  style={{
      backgroundImage: `url(${imageUrl})`,
      cursor: 'pointer',
    }}
  >
    <div className="naslov">
      {!showDetails && <h2>{headline || 'Loading headline...'}</h2>}
      <button className="bookmark-button"
      onClick={(e) => {
      e.stopPropagation();

      const storedIds = JSON.parse(localStorage.getItem('bookmarked-urls') || '[]');
      const storedArticles = JSON.parse(localStorage.getItem('bookmarked-articles') || '{}');

      const identifier = url;
      const fullArticle = { url, title: headline, description, urlToImage: imageUrl };

      let updatedIds = [...storedIds];
      let updatedArticles = { ...storedArticles };
      let brojac = 0;

      if (bookmark) {
        updatedIds = storedIds.filter(item => item !== identifier);
        delete updatedArticles[identifier];
        brojac = -1;
      } else {
        if (!storedIds.includes(identifier)) {
          updatedIds.push(identifier);
          updatedArticles[identifier] = fullArticle;
        }
        brojac = 1;
      }

      localStorage.setItem('bookmarked-urls', JSON.stringify(updatedIds));
      localStorage.setItem('bookmarked-articles', JSON.stringify(updatedArticles));

      setBookmark(!bookmark);
      setSova([sova[0], sova[1] + brojac]);
      }}
      style={{
        backgroundImage: `url(${bookmark ? iconBookmarkFilled : iconBookmark})`,
      }}></button>
    </div>
    {showDetails && (
        <div className="news-details">
          <p>{description}</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <button className="read-more">Read More</button>
          </a>
        </div>
      )}
  </div>)
}

export default GlavnaVijest