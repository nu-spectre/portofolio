import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/project', label: 'Project' },
  { to: '/about', label: 'About' },
]

function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <img src="/react-logo.png" alt="logo" className="brand-logo" />
            <span className="brand-name">Wisnu Portofolio</span>
          </Link>
          <div className="navbar-links">
            {links.map(link => (
              <Link key={link.to} to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <button className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {links.map(link => (
          <Link key={link.to} to={link.to}
            className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  )
}

export default Navbar
