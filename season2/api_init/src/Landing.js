import VideoList from './components/videoList';
import { Form } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

import './css/App.css';
import './css/Landing.css';

export default function Landing() {
  const API_KEY = 'youtube api key';
  const maxResults = 12;
  const [searchQuery, setsearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=${maxResults}&q=${searchQuery}`);
      setVideos(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };


  const refreshAccessToken = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "");
    urlencoded.append("client_secret", "");
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("refresh_token", "");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://oauth2.googleapis.com/token", requestOptions)
      .then(response => response.json())
      .then(result => {
        const accessToken = result.access_token;
        setAccessToken(accessToken);
        localStorage.setItem('accessToken', accessToken);
      })
      .catch(error => console.log('error', error));
  };

  return (
    <div className="landingContainer" onLoad={refreshAccessToken} >
      <div className='containerMainHeader'>
        <div className='mainHeader'>
          <img src='./logo.png' alt='logo' className='logo' height={50} />
          <h1 className="my-4">WishTube</h1>
        </div>
        <Form class="form>Container" onSubmit={handleSearch}>
          <Form.Group controlId="formSearch">
            <Form.Control
              type="text"
              placeholder="Search for videos"
              value={searchQuery}
              onChange={(e) => setsearchQuery(e.target.value)}
              width={100}
            />
          </Form.Group>
        </Form>
      </div>
      <div className='containerCard'>
        {videos.length > 0 ? <VideoList className="videoCard" videos={videos} /> : null}
      </div>
    </div>
  );
}
