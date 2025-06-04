import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

const Message = ({ message, type }) => {
    if (!message) {
        return null;
    }

    // Determine the class name based on the message type for styling
    const messageClass = type === 'error' ? 'message-error' :
                         type === 'success' ? 'message-success' :
                         'message-info'; // Default or other types

    return (
        <div className={`message ${messageClass}`}>
            {message}
        </div>
    );
};

Message.propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf(['success', 'error', 'info'])
};

Message.defaultProps = {
    message: null,
    type: 'info'
};

export default Message;

