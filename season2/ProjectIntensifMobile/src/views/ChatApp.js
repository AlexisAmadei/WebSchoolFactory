import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

import '../css/ChatApp.css';
import leftChevron from '../assets/leftChevron.svg';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const currentUser = localStorage.getItem('currentUser');
  const destinationUser = localStorage.getItem('destinationUser');
  const destPseudo = localStorage.getItem('destPseudo');

  const navigate = useNavigate();

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(
        snapshot.docs
          .map((doc) => doc.data())
          .filter(
            (message) =>
              (message.from === currentUser && message.to === destinationUser) ||
              (message.from === destinationUser && message.to === currentUser)
          )
      );
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser, destinationUser]);
  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'messages'), {
        from: currentUser,
        to: destinationUser,
        message: input,
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setInput('');
  };
  const handleBackButton = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <div className="chatApp">
      <div className='chatAppHeader'>
        <img id="headerChevron" src={leftChevron} onClick={handleBackButton} alt='going back' />
        <p id='pseudo'>{destPseudo}</p>
      </div>
      <div className="chatApp__messages">
        {messages.map((message) => (
          <p key={message.timestamp} className={message.from === currentUser ? 'sent' : 'received'}>
            {message.message}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chatApp__input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
