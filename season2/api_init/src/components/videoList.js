import React from 'react';
import VideoCard from './videoCard';

import '../css/videoList.css';

const VideoList = ({ videos }) => {

  return (
    <div className="d-flex flex-wrap justify-content-center container">
      {videos.map((video) => (
        <div className='videoCardCONT'>
          <VideoCard key={video.id.videoId} video={video} />
        </div>
      ))}
    </div >
  );
};

export default VideoList;
