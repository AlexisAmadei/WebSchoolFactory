import React, { useState } from 'react';
import { Card, Modal, Form, Button } from 'react-bootstrap';

import { HtmlText, cutLongText } from './htmlFormatting';

import '../css/videoCard.css'

const VideoCard = ({ video }) => {
  const [showModal, setShowModal] = useState(false);
  const [inputText, setInputText] = useState('');
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleChange = (e) => setInputText(e.target.value);

  const handleCommentSend = (textInput) => {
    const access_token = localStorage.getItem('accessToken');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + access_token);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "snippet": {
        "videoId": video.id.videoId,
        "topLevelComment": {
          "snippet": {
            "textOriginal": textInput
          }
        }
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&key=AIzaSyBipS08ry12jn0x0xBVHm1OELZ5vcUmZkg", requestOptions)
      .then(response => response.text())
      .then(setInputText(''))
      .then(handleClose())
      .catch(error => console.log('error', error));
  };
  return (
    <>
      <Card onClick={handleShow} style={{
        width: '18rem',
        margin: '10px',
        color: 'white',
        border: 'none',
      }}>
        <Card.Img style={{ borderRadius: '10px', backgroundColor: 'black' }} variant="top" src={video.snippet.thumbnails.medium.url} />
        <Card.Body>
          <HtmlText text={cutLongText(video.snippet.title)} />
          <Card.Text style={{ color: '#909090' }}>{video.snippet.channelTitle}</Card.Text>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }} >
          <HtmlText text={cutLongText(video.snippet.channelTitle)} color={'black'} />
          <HtmlText text={cutLongText(video.snippet.title)} />
        </Modal.Header>
        <Modal.Body>
          <iframe
            title="videoPlayer"
            width="100%"
            height="315"
            src={videoSrc}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Form onSubmit={(e) => {
            e.preventDefault();
            handleCommentSend(inputText);
          }}>
            <Form.Group controlId="formInputText">
              <Form.Control
                type="text"
                placeholder="Ajoutez votre commentaire..."
                value={inputText}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              style={{
                marginTop: '8px',
                backgroundColor: 'red',
                border: 'none',
              }}
              onSubmit={() => {
                setInputText('');
              }}
              type="submit">Envoyer</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoCard;
