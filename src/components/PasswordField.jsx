import { useState } from 'react'

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  error,
  required = true,
}) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="field-group">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <div className={`input-wrap ${error ? 'input-wrap-error' : ''}`}>
        <span className="field-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none">
            <rect x="4" y="8.5" width="12" height="9" rx="2" />
            <path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5" />
          </svg>
        </span>
        <input
          autoComplete={autoComplete}
          id={id}
          minLength={id === 'confirmPassword' ? undefined : 6}
          name={id}
          onChange={onChange}
          placeholder="At least 6 characters"
          required={required}
          type={isVisible ? 'text' : 'password'}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          className="visibility-toggle"
          onClick={() => setIsVisible((visible) => !visible)}
          type="button"
        >
          {isVisible ? (
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 3l14 14M8.6 5.2A7.3 7.3 0 0 1 10 5c4.2 0 7 5 7 5a12 12 0 0 1-2.1 2.7M5.2 6.1C3.8 7.2 3 10 3 10s2.8 5 7 5c.8 0 1.6-.2 2.3-.5" />
              <path d="M8.6 8.6a2 2 0 0 0 2.8 2.8" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 10s2.8-5 7-5 7 5 7 5-2.8 5-7 5-7-5-7-5Z" />
              <circle cx="10" cy="10" r="2" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  )
}

export default PasswordField
