import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="text-white py-3" style={{ backgroundColor: '#3498DB' }}>
      <div className="container-fluid px-4">
        <div className="row align-items-center mb-2">
          <div className="col-12 col-md-4 d-flex justify-content-md-start justify-content-center align-items-center">
            <img src="/Logo.png" alt="LearnUp Logo" height="40" />
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-center align-items-center flex-wrap gap-4">
            <a href="#" className="text-white text-decoration-none large">Privacy policy</a>
            <a href="#" className="text-white text-decoration-none large">Terms of Service</a>
            <a href="#" className="text-white text-decoration-none large">Refunds</a>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-md-end justify-content-center align-items-center gap-4 fs-5">
            <a href="#" className="text-white">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="text-white">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="text-white">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col text-center small">
            ©2025 Online Course Platform. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
