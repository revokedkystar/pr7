import React, { ReactNode, AnchorHTMLAttributes } from 'react';

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
  return (
    <div
      className={className ? `${className} navbar-blur` : 'navbar-blur'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        zIndex: 101,
        height: '64px',
        fontFamily: 'NavFont, Geist, system-ui, sans-serif',
        backdropFilter: 'blur(35x)',
        WebkitBackdropFilter: 'blur(35px)',
      }}
    >
      {/* Nav Links (now left also josh was here) */}
      <nav
        style={{
          position: 'absolute',
          left: 48,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          gap: '34px',
          fontSize: '1.5rem',
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
        <NavLink href="/studio">studio</NavLink>
        <NavLink href="/about">cv</NavLink>
      </nav>
      {/* Logo (now centered) */}
      <div style={{ position: 'absolute', left: '50%', top: '55%', transform: 'translate(-50%, -50%)' }}>
        <a href="/" style={{ display: 'inline-block' }}>
          <img
            src="/images.png"
            alt="Logo"
            style={{
              height: '48px',
              width: '48px',
              objectFit: 'contain',
              userSelect: 'none',
            }}
          />
        </a>
      </div>
      {/* Contact Button */}
      <div style={{ position: 'absolute', right: 48, top: '50%', transform: 'translateY(-50%)' }}>
        <a
          href="/contact"
          style={{
            background: '#fff',
            color: '#111',
            border: 'none',
            borderRadius: '999px',
            padding: '8px 24px',
            fontWeight: 600,
            fontFamily: 'NavFont, Geist, system-ui, sans-serif',
            fontSize: '1.1rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
            transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
          }}
        >
          contact
        </a>
      </div>
    </div>
  );
}
//hello!"!!!"joshua was here