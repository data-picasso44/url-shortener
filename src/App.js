import { useState } from 'react';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_BITLY_ACCESS_TOKEN}`
      },
    
      body: JSON.stringify({ long_url: longUrl })
    });
    const data = await response.json();
    setShortUrl(data.link);
  }

  return (
    <div className='container'>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='long-url'>Long URL</label>
          <input type='text' id='long-url'
          name='long-url'
          value={longUrl}
          onChange={(event) => setLongUrl(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='short-url'>Short URL</label>
          <input type='text' id='short-url'
          name='short-url'
          value={shortUrl}
          readOnly
          />
        </div>
        <button type='submit'>Shorten URL</button>
      </form>
    </div>
  );
}

export default App;
