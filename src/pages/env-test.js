import React, { useState } from "react"

const EnvTestPage = () => {
  const [fetchResult, setFetchResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(null)

  // Environment variables
  const apiUrl = process.env.GATSBY_API_URL
  const apiKey = process.env.GATSBY_API_KEY

  // Test fetch with environment variable interpolation
  const testFetch = async () => {
    setIsLoading(true)
    setFetchError(null)
    setFetchResult(null)

    try {
      // Your pattern: template literal with env vars
      const fetchUrl = `${apiUrl}/api/drupal-config?api-key=${apiKey}`
      
      console.log('Fetch URL:', fetchUrl)
      
      const response = await fetch(fetchUrl)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`)
      }

      const data = await response.text()
      setFetchResult({
        url: fetchUrl,
        status: response.status,
        data: data.substring(0, 300) + (data.length > 300 ? '...' : '')
      })
    } catch (error) {
      setFetchError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Mock test to show URL construction
  const testMockFetch = () => {
    const mockUrl = `${apiUrl}/api/drupal-config?api-key=${apiKey}`
    setFetchResult({
      url: mockUrl,
      status: 'mock',
      data: 'Mock response - URL constructed successfully!'
    })
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px' }}>
      <h1>GATSBY_API_KEY Fetch Test</h1>
      
      <div style={{ marginBottom: '2rem', background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
        <p><strong>API URL:</strong> {apiUrl || 'Not set'}</p>
        <p><strong>API Key Raw Value:</strong> {apiKey || 'Not set'}</p>
        <p><strong>Template:</strong> <code>{`\`\${apiUrl}/api/drupal-config?api-key=\${apiKey}\``}</code></p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={testMockFetch}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '1rem'
          }}
        >
          Test URL Construction
        </button>
        
        <button 
          onClick={testFetch}
          disabled={isLoading || !apiUrl || !apiKey}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: (isLoading || !apiUrl || !apiKey) ? 'not-allowed' : 'pointer',
            opacity: (isLoading || !apiUrl || !apiKey) ? 0.6 : 1
          }}
        >
          {isLoading ? 'Fetching...' : 'Test Real Fetch'}
        </button>
      </div>

      {fetchResult && (
        <div style={{ background: '#d4edda', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
          <h3>✅ Result:</h3>
          <p><strong>URL:</strong> <code style={{ wordBreak: 'break-all' }}>{fetchResult.url}</code></p>
          <p><strong>Status:</strong> {fetchResult.status}</p>
          <div style={{ marginTop: '0.5rem' }}>
            <strong>Response:</strong>
            <pre style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '4px', overflow: 'auto' }}>
              {fetchResult.data}
            </pre>
          </div>
        </div>
      )}

      {fetchError && (
        <div style={{ background: '#f8d7da', padding: '1rem', borderRadius: '4px' }}>
          <h3>❌ Error:</h3>
          <p>{fetchError}</p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>
            This is normal if the API endpoint doesn't exist. Check that the URL was constructed correctly above.
          </p>
        </div>
      )}

      <div style={{ marginTop: '2rem', fontSize: '0.9em', color: '#666' }}>
        <p><strong>Setup:</strong> Add these to your <code>.env.development</code>:</p>
        <pre style={{ background: '#f8f9fa', padding: '0.5rem', borderRadius: '4px' }}>
{`GATSBY_API_URL=https://your-api.com
GATSBY_API_KEY=your-secret-key`}
        </pre>
      </div>
    </div>
  )
}

export default EnvTestPage