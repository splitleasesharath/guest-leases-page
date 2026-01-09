import React from 'react';
import { Menu, X, ChevronDown, Search, Bell, User } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  userName?: string;
  userImage?: string;
  onExploreRentals?: () => void;
  onNotifications?: () => void;
  onProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = 'Guest',
  userImage,
  onExploreRentals,
  onNotifications,
  onProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <a href="/" className="logo-link">
            <img
              src="/logo.png"
              alt="Split Lease"
              className="logo-image"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="logo-text hidden">Split Lease</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          <div className="nav-dropdown">
            <button className="nav-link">
              For Hosts <ChevronDown size={16} />
            </button>
          </div>
          <div className="nav-dropdown">
            <button className="nav-link">
              For Guests <ChevronDown size={16} />
            </button>
          </div>
          <a href="/how-it-works" className="nav-link">
            How It Works
          </a>
        </nav>

        {/* Right Section */}
        <div className="header-right">
          <button className="explore-btn" onClick={onExploreRentals}>
            <Search size={16} />
            Explore Rentals
          </button>

          <button className="icon-btn notification-btn" onClick={onNotifications}>
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>

          <button className="user-btn" onClick={onProfile}>
            {userImage ? (
              <img src={userImage} alt={userName} className="user-avatar" />
            ) : (
              <User size={20} />
            )}
            <span className="user-name">{userName}</span>
            <ChevronDown size={16} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="header-nav mobile-nav">
          <a href="/for-hosts" className="nav-link">
            For Hosts
          </a>
          <a href="/for-guests" className="nav-link">
            For Guests
          </a>
          <a href="/how-it-works" className="nav-link">
            How It Works
          </a>
          <button className="explore-btn mobile" onClick={onExploreRentals}>
            <Search size={16} />
            Explore Rentals
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
