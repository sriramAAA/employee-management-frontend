import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import PasswordField from '../components/PasswordField.jsx'
import { getApiErrorMessage, loginUser } from '../services/api.js'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setMessage(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage(null)
    setIsSubmitting(true)

    try {
      const result = await loginUser({
        email: form.email.trim(),
        password: form.password,
      })
      if (
        result?.message === 'Login successful' &&
        typeof result.email === 'string' &&
        result.email.trim()
      ) {
        window.location.href = 'https://nova-ecomm.netlify.app/'
        return
      }

      setMessage({
        type: 'error',
        text:
          typeof result?.message === 'string' && result.message.trim()
            ? result.message
            : 'The server returned an invalid login response. Please try again.',
      })
    } catch (error) {
      setMessage({ type: 'error', text: getApiErrorMessage(error) })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="WELCOME BACK"
      title="Sign in"
      description="Your next chapter is just a moment away."
      footer={
        <p className="form-switch">
          New around here? <Link to="/register">Create an account <span aria-hidden="true">↗</span></Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {message && (
          <div className={`feedback feedback-${message.type}`} role="alert">
            <span aria-hidden="true">{message.type === 'success' ? '✓' : '!'}</span>
            {message.text}
          </div>
        )}
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
          autoComplete="current-password"
          id="password"
          label="Password"
          onChange={handleChange}
          value={form.password}
        />
        <button className="submit-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <span className="button-spinner" aria-hidden="true" />
              Signing in...
            </>
          ) : (
            <>Sign in <span aria-hidden="true">→</span></>
          )}
        </button>
        <p className="form-hint">Use the email and password associated with your account.</p>
      </form>
    </AuthLayout>
  )
}

export default Login
