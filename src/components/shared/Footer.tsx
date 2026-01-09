import React from 'react';
import { Smartphone, Headphones } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* For Hosts */}
          <div className="footer-section">
            <h4 className="footer-title">For Hosts</h4>
            <ul className="footer-links">
              <li><a href="/list-property">List Your Property</a></li>
              <li><a href="/host-dashboard">Host Dashboard</a></li>
              <li><a href="/host-resources">Resources</a></li>
              <li><a href="/host-protection">Host Protection</a></li>
            </ul>
          </div>

          {/* For Guests */}
          <div className="footer-section">
            <h4 className="footer-title">For Guests</h4>
            <ul className="footer-links">
              <li><a href="/search">Find a Rental</a></li>
              <li><a href="/how-it-works">How It Works</a></li>
              <li><a href="/guest-protection">Guest Protection</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/press">Press</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Get the App */}
          <div className="footer-section">
            <h4 className="footer-title">Get the App</h4>
            <div className="app-buttons">
              <a href="#" className="app-store-btn">
                <Smartphone size={20} />
                <div className="app-store-text">
                  <span className="small">Download on the</span>
                  <span className="large">App Store</span>
                </div>
              </a>
              <a href="#" className="app-store-btn">
                <Smartphone size={20} />
                <div className="app-store-text">
                  <span className="small">Get it on</span>
                  <span className="large">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Refer a Friend */}
          <div className="footer-section">
            <h4 className="footer-title">Refer a Friend</h4>
            <p className="footer-text">
              Earn credits when you refer hosts and guests to Split Lease.
            </p>
            <a href="/referral" className="referral-link">Learn More</a>
          </div>

          {/* Alexa Skill */}
          <div className="footer-section">
            <h4 className="footer-title">Alexa Skill</h4>
            <div className="alexa-promo">
              <Headphones size={24} />
              <p>Use voice commands with our Alexa skill</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <p>&copy; {new Date().getFullYear()} Split Lease. All rights reserved.</p>
            <div className="legal-links">
              <a href="/privacy">Privacy Policy</a>
              <span className="separator">|</span>
              <a href="/terms">Terms of Service</a>
              <span className="separator">|</span>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Facebook" className="social-link">FB</a>
            <a href="#" aria-label="Twitter" className="social-link">TW</a>
            <a href="#" aria-label="Instagram" className="social-link">IG</a>
            <a href="#" aria-label="LinkedIn" className="social-link">LI</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
