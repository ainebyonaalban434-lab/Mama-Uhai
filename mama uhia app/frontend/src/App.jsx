import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState('Checking backend...');

  useEffect(() => {
    fetch('/api/status')
      .then((response) => response.json())
      .then((data) => setStatus(data.message))
      .catch(() => setStatus('Backend unavailable'));
  }, []);

  return (
    <div className="app-shell">
      <div className="card">
        <h1>Mama Uhai</h1>
        <p>Frontend and backend scaffold created for the Mama Uhai app.</p>
        <p className="status">Backend status: {status}</p>
        <a href="https://mama-uhai-d58e5f43.base44.app" target="_blank" rel="noreferrer">
          Open deployed app
        </a>
      </div>
    </div>
  );
}

export default App;
