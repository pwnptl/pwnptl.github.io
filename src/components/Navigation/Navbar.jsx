import { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { MdChevronRight } from 'react-icons/md';
import { Heading, Button } from '@ui';
import { getColors } from '@theme/colors';
import { useTheme } from '@theme/ThemeContext';
import { breakpoints } from '@theme/breakpoints';
import navbarData from '@data/navbar.json';
import './Navbar.css';

function NavLink({ href, children, onClick, id, isMobile }) {
  const colors = getColors();
  return (
    <a
      id={id}
      href={href}
      onClick={() => {
        if (isMobile) {
          onClick();
        }
      }}
      style={{ color: colors.navbar.text }}
      onMouseEnter={(e) => (e.target.style.color = colors.accent.secondary)}
      onMouseLeave={(e) => (e.target.style.color = colors.navbar.text)}
    >
      {children}
    </a>
  );
}

export default function NavbarComponent() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoints.md);
  const [isOpen, setIsOpen] = useState(window.innerWidth > breakpoints.md);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= breakpoints.md;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen]);

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const colors = getColors();

  return (
    <Container id="navbar-container" fluid ref={navbarRef}>
      {isMobile && navbarData.isNavBarTopButton && (
        <Button
          id="navbar-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-nav-toggle"
          style={{
            backgroundColor: colors.navbar.primary,
            color: colors.navbar.text,
            borderColor: colors.navbar.secondary,
            padding: '0.6rem',
          }}
        >
          {isOpen ? <MdClose size={20}/> : <GiHamburgerMenu size={20}/>}
        </Button>
      )}

      {isMobile && navbarData.isNavBarNotchEnabled && (
        <button
          id="navbar-notch"
          onClick={() => setIsOpen(!isOpen)}
          className={`navbar-notch ${isOpen ? 'stick-to-navbar' : ''}`}
          style={{
            backgroundColor: colors.navbar.primary,
            color: colors.navbar.text,
            borderColor: colors.navbar.secondary,
            display: isOpen ? 'flex' : 'flex',
            opacity: isOpen ? 0.5 : 1,
          }}
          title={isOpen ? 'Close navigation' : 'Open navigation'}
        >
          <MdChevronRight size={24} style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0)'}}/>
        </button>
      )}

      {isMobile && isOpen && (
        <div
          id="navbar-backdrop"
          className="navbar-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        id="navbar-sidebar"
        className={`navbar-sidebar ${isOpen ? 'open' : 'closed'}`}
        style={{
          backgroundColor: colors.navbar.primary,
          borderRightColor: colors.navbar.secondary,
        }}
      >
        <Heading
          id="navbar-brand"
          level="h3"
          className="navbar-brand"
          style={{color: colors.navbar.text}}
        >
          {navbarData.brand}
        </Heading>
        <nav id="navbar-nav" className="navbar-nav">
          {navbarData.navLinks.map((link) => (
            <NavLink
              key={link.id}
              id={link.id}
              href={link.href}
              onClick={handleNavClick}
              isMobile={isMobile}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </Container>
  );
}

