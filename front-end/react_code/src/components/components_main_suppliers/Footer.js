import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the newsletter to receive our best deals
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button index='1'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/main/founders'>Founders</Link>
            <Link >Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='main/contact_us'>Contact</Link>
            <Link >Support</Link>
            <Link >Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>

          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link >Instagram</Link>
            <Link >Facebook</Link>
            <Link >Twitter</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              EVolution
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>EVolution © 2021</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
