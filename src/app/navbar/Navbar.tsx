import React, { ReactNode, AnchorHTMLAttributes, useState, useEffect } from 'react';

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

function NavLink({ href, children, ...props }: NavLinkProps) {
  return (
    <a href={href} className="nav-underline-link" {...props}>
      {children}
      <span className="nav-underline" />
    </a>
  );
}

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check local storage or default to dark (false)
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      setIsLightMode(true);
      document.documentElement.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsLightMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
      }
      return newMode;
    });
  };

  return (
    <div
      className={className ? `${className} navbar-blur` : 'navbar-blur'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 101,
        // Fluid height: 64px on mobile, scales up to 80px on large screens
        height: 'clamp(64px, 8vw, 80px)',
        fontFamily: 'NavFont, Geist, system-ui, sans-serif',
        backdropFilter: 'blur(35px)',
        WebkitBackdropFilter: 'blur(35px)',
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spinOnce {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .logo-spin {
          animation: spinOnce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}} />
      
      {/* Nav Links (left side) */}
      <nav
        style={{
          position: 'absolute',
          // Fluid edge spacing: 16px on mobile, 48px on desktop
          left: 'clamp(16px, 5vw, 48px)', 
          top: '45%',
          transform: 'translateY(-50%)',
          display: 'flex',
          // Fluid gap between links
          gap: 'clamp(16px, 3vw, 34px)',
          // Fluid font size: 1rem (16px) on mobile, 1.5rem (24px) on desktop
          fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
          color: '#fff',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          background: 'transparent',
          border: 'none',
          padding: 0,
          fontFamily: 'NavFont, Geist, system-ui, sans-serif',
        }}
      >
        <NavLink href="https://linktr.ee/h4tfi3ld">LINKTREE</NavLink>
        <NavLink href="/cv">CV</NavLink>
      </nav>

      {/* Logo (centered) */}
      <div style={{ 
          position: 'absolute', 
          left: '50%', 
          top: '45%', 
          transform: 'translate(-50%, -50%)' 
      }}>
        <a href="/" style={{ display: 'inline-block' }}>
          <img
            src="/images.png"
            alt="Logo"
            style={{
              // Fluid logo sizing
              height: 'clamp(32px, 5vw, 48px)',
              width: 'clamp(32px, 5vw, 48px)',
              objectFit: 'contain',
              userSelect: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.classList.add('logo-spin');
            }}
            onAnimationEnd={(e) => {
              e.currentTarget.classList.remove('logo-spin');
            }}
          />
        </a>
      </div>

      {/* Right side controls (Theme Toggle + Contact) */}
      <div style={{ 
          position: 'absolute', 
          // Fluid edge spacing
          right: 'clamp(16px, 5vw, 48px)', 
          top: '45%', 
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(12px, 2vw, 24px)'
      }}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            width: 'clamp(36px, 4vw, 44px)',
            height: 'clamp(36px, 4vw, 44px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
          aria-label="Toggle Theme"
        >
          {isLightMode ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          )}
        </button>

        {/* Contact Button */}
        <a
          href="/contact"
          style={{
            background: '#fff',
            color: '#111',
            border: 'none',
            borderRadius: '999px',
            // Fluid padding
            padding: 'clamp(6px, 1vw, 8px) clamp(16px, 3vw, 24px)',
            fontWeight: 600,
            fontFamily: 'NavFont, Geist, system-ui, sans-serif',
            // Fluid font size
            fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.12)';
            e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(0,0,0,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0,0,0,0.10)';
          }}
        >
          contact
        </a>
      </div>
    </div>
  );
}