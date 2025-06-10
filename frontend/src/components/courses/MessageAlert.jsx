import React from 'react';

const MessageAlert = ({ message, onClose }) => {
  const { text, type } = message;
  const style = {
    success: { backgroundColor: '#27AE60', color: 'white' },
    error: { backgroundColor: '#E74C3C', color: 'white' }
  }[type] || { display: 'none' };

  return (
    <div className="alert alert-dismissible fade show" role="alert" style={{ ...style, marginBottom: '20px' }}>
      {text}
      <button type="button" className="btn-close" onClick={onClose} aria-label="Close" style={{ filter: 'invert(1)' }}></button>
    </div>
  );
};

export default MessageAlert;