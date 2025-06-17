import { useState, useEffect } from 'react';


function GlavnaVijest() {
  const [headline, setHeadline] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [showDetails, setShowDetails] = useState(false);


  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=5f65315585d841a38ddf4e78f42f5f2c'
        );
        const data = await res.json();
        const firstArticle = data.articles[0];

        setHeadline(firstArticle.title);
        setImageUrl(firstArticle.urlToImage);
        setDescription(firstArticle.description);
        setUrl(firstArticle.url);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    }

    fetchNews();
  }, []);

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