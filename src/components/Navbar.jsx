import { Link } from 'react-router-dom'

function Navbar({ isAuthenticated, onLogout }) {
  return (
    <header className="site-header">
      <Link className="brand" to={isAuthenticated ? '/dashboard' : '/login'}>
        <span className="brand-mark" aria-hidden="true">
          N
        </span>
        <span>northstar</span>
      </Link>
      <div className="header-note">
        <span className="status-dot" aria-hidden="true" />
        Your space, made simple
      </div>
      {isAuthenticated ? (
        <button className="header-action" onClick={onLogout} type="button">
          Sign out <span aria-hidden="true">↗</span>
        </button>
      ) : (
        <span className="header-caption">A better way to begin</span>
      )}
    </header>
  )
}

export default Navbar
