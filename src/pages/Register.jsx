import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import PasswordField from '../components/PasswordField.jsx'
import { getApiErrorMessage, registerUser } from '../services/api.js'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  const [message, setMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setMessage(null)

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage(null)

    if (form.password !== form.confirmPassword) {
      setPasswordError('Your passwords do not match.')
      return
    }

    setPasswordError('')
    setIsSubmitting(true)

    try {
      const result = await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      })
      setMessage({
        type: 'success',
        text: result?.message || 'Your account is ready. You can now sign in.',
      })
      window.setTimeout(() => navigate('/login', { replace: true }), 1400)
    } catch (error) {
      setMessage({ type: 'error', text: getApiErrorMessage(error) })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="YOUR NEXT CHAPTER"
      title="Create your account"
      description="A few details and you're on your way."
      footer={
        <p className="form-switch">
          Already have an account? <Link to="/login">Sign in <span aria-hidden="true">↗</span></Link>
        </p>
      }
    >
      <form className="auth-form register-form" onSubmit={handleSubmit}>
        {message && (
          <div className={`feedback feedback-${message.type}`} role={message.type === 'error' ? 'alert' : 'status'}>
            <span aria-hidden="true">{message.type === 'success' ? '✓' : '!'}</span>
            {message.text}
          </div>
        )}
        <div className="field-group">
          <label className="field-label" htmlFor="name">Full name</label>
          <div className="input-wrap">
            <span className="field-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="6.5" r="3" />
                <path d="M4.5 17v-1.5a5.5 5.5 0 0 1 11 0V17h-11Z" />
              </svg>
            </span>
            <input
              autoComplete="name"
              id="name"
              minLength={2}
              name="name"
              onChange={handleChange}
              placeholder="Your name"
              required
              type="text"
              value={form.name}
            />
          </div>
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="email">Email address</label>
          <div className="input-wrap">
            <span className="field-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none">
                <rect x="2.5" y="4" width="15" height="12" rx="2" />
                <path d="m3.5 5.5 6.5 5 6.5-5" />
              </svg>
            </span>
            <input
              autoComplete="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              required
              type="email"
              value={form.email}
            />
          </div>
        </div>
        <PasswordField
          autoComplete="new-password"
          id="password"
          label="Password"
          onChange={handleChange}
          value={form.password}
        />
        <PasswordField
          autoComplete="new-password"
          error={passwordError}
          id="confirmPassword"
          label="Confirm password"
          onChange={handleChange}
          value={form.confirmPassword}
        />
        <button className="submit-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <span className="button-spinner" aria-hidden="true" />
              Creating account...
            </>
          ) : (
            <>Create account <span aria-hidden="true">→</span></>
          )}
        </button>
        <p className="form-hint">By continuing, you agree to use this learning app responsibly.</p>
      </form>
    </AuthLayout>
  )
}

export default Register
