import React from 'react';

const footerStyles: React.CSSProperties = {
  backgroundColor: '#333', // Replace with your sidebar background color
  color: '#fff', // Replace with your sidebar text color
  textAlign: 'right',
  padding: '0px',
  position: 'relative',
  width: '100%',
};

const footerTextStyles = {
  margin: 0,
  FontFace: "ui-sans-serif",
  fontSize: '12px'
};

const Footer: React.FC = () => {
  return (
    <div style={footerStyles}>
      <p style={footerTextStyles}>Flaužar 2025</p>
    </div>
  );
};

export default Footer;