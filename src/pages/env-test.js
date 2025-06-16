import React from "react"

const EnvTestPage = () => {
  // Get all environment variables that start with GATSBY_
  const gatsbyEnvVars = Object.keys(process.env)
    .filter(key => key.startsWith('GATSBY_'))
    .reduce((obj, key) => {
      obj[key] = process.env[key]
      return obj
    }, {})

  // Example: Access a specific GATSBY_ env var
  const testVar = process.env.GATSBY_TEST_VAR
  const apiUrl = process.env.GATSBY_API_URL
  const environment = process.env.GATSBY_ENVIRONMENT

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Gatsby Environment Variables Test</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Environment Info</h2>
        <p><strong>Node Environment:</strong> {process.env.NODE_ENV}</p>
        <p><strong>Gatsby Stage:</strong> {process.env.GATSBY_STAGE || 'Not set'}</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Specific GATSBY_ Variables</h2>
        <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
          <p><strong>GATSBY_TEST_VAR:</strong> {testVar || 'Not set'}</p>
          <p><strong>GATSBY_API_URL:</strong> {apiUrl || 'Not set'}</p>
          <p><strong>GATSBY_ENVIRONMENT:</strong> {environment || 'Not set'}</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>All GATSBY_ Prefixed Variables</h2>
        {Object.keys(gatsbyEnvVars).length > 0 ? (
          <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
            {Object.entries(gatsbyEnvVars).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        ) : (
          <p style={{ color: '#666' }}>No GATSBY_ prefixed environment variables found</p>
        )}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Runtime Test</h2>
        <button 
          onClick={() => {
            alert(`Current GATSBY_TEST_VAR value: ${process.env.GATSBY_TEST_VAR || 'Not set'}`)
          }}
          style={{
            padding: '0.5rem 1rem',
            background: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Runtime Access
        </button>
      </div>

      <div style={{ fontSize: '0.9rem', color: '#666' }}>
        <h3>💡 Tips:</h3>
        <ul>
          <li>Only variables prefixed with <code>GATSBY_</code> are available in the browser</li>
          <li>Add your variables to <code>.env.development</code> or <code>.env.production</code></li>
          <li>Restart your development server after adding new environment variables</li>
          <li>Example: <code>GATSBY_TEST_VAR=hello-world</code></li>
        </ul>
      </div>
    </div>
  )
}

export default EnvTestPage

// Optional: Add metadata for the page
export const Head = () => (
  <>
    <title>Environment Variables Test</title>
    <meta name="description" content="Test page for Gatsby environment variables" />
  </>
)