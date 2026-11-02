function AuthLayout({ eyebrow, title, description, children, footer }) {
  return (
    <main className="auth-main">
      <section className="story-panel" aria-label="About Northstar">
        <div className="story-orbit story-orbit-one" />
        <div className="story-orbit story-orbit-two" />
        <div className="story-content">
          <div className="story-kicker">
            <span className="sparkle" aria-hidden="true">✦</span>
            A little more focus. A lot more possibility.
          </div>
          <h1>
            Make room for
            <br />
            what <span>matters.</span>
          </h1>
          <p>
            A calm place to pick up where you left off, keep your plans close,
            and move forward at your own pace.
          </p>
          <div className="story-note">
            <span className="note-icon" aria-hidden="true">✳</span>
            <span>Small steps can take you somewhere wonderful.</span>
          </div>
        </div>
        <div className="story-bottom">
          <span>DESIGNED FOR YOUR NEXT CHAPTER</span>
          <span className="story-line" />
        </div>
      </section>

      <section className="form-panel">
        <div className="auth-card">
          <div className="card-heading">
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          {children}
          {footer}
          <div className="privacy-note">
            <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <rect x="3.5" y="7.5" width="11" height="8" rx="1.8" />
              <path d="M5.8 7.5V5.3a3.2 3.2 0 1 1 6.4 0v2.2" />
            </svg>
            Your account details are sent to your configured backend.
          </div>
        </div>
        <div className="form-decoration" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  )
}

export default AuthLayout
