import { useNavigate } from 'react-router-dom'

function Dashboard({ email, onLogout }) {
  const navigate = useNavigate()

  function handleLogout() {
    onLogout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="dashboard-main">
      <section className="dashboard-card">
        <div className="dashboard-art" aria-hidden="true">
          <span className="dashboard-star star-one">✦</span>
          <span className="dashboard-star star-two">✧</span>
          <span className="dashboard-orbit" />
          <span className="dashboard-sun" />
          <span className="dashboard-hill hill-back" />
          <span className="dashboard-hill hill-front" />
        </div>
        <div className="dashboard-copy">
          <span className="eyebrow">YOUR NORTHSTAR SPACE</span>
          <h1>Welcome in.</h1>
          <p className="dashboard-intro">
            Good to have you here. This is your little corner to pause, reset,
            and take the next step.
          </p>
          <div className="account-detail">
            <span className="account-avatar" aria-hidden="true">
              {email.charAt(0).toUpperCase()}
            </span>
            <span>
              <span className="detail-label">SIGNED IN AS</span>
              <strong>{email}</strong>
            </span>
            <span className="account-check" aria-label="Signed in">✓</span>
          </div>
          <div className="session-notice" role="note">
            <span aria-hidden="true">i</span>
            <p>
              This demo keeps your signed-in email in memory only. The backend
              response does not provide a session token, so this frontend state
              does not secure backend resources and will reset when you refresh.
            </p>
          </div>
          <button className="submit-button dashboard-logout" onClick={handleLogout} type="button">
            Sign out <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
      <p className="dashboard-caption">A fresh start, whenever you need one.</p>
    </main>
  )
}

export default Dashboard
