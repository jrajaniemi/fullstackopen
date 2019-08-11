import React from 'react';

const Alert = ({ message, messageType }) => {
  const alert = 'mt-3 mb-1 alert alert-' + messageType;
  if (message === '') {
    return <div />;
  } else {
    return (
      <div className={alert} role="alert">
        {message}
      </div>
    );
  }
};

export default Alert;
