import { useState } from 'react'
import { HeartIcon, StarIcon } from './icons/basic'
import { GithubIcon, TwitterIcon } from './icons/social'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Icon Forge Demo</h1>
        <p>Testing the vite-plugin-icon-forge</p>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', fontSize: '48px', justifyContent: 'center', margin: '20px 0' }}>
        <HeartIcon style={{ color: 'red' }} />
        <StarIcon style={{ color: 'gold' }} />
        <GithubIcon style={{ color: '#333' }} />
        <TwitterIcon style={{ color: '#1da1f2' }} />
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Icons are automatically generated from SVG files!
        </p>
      </div>
      
      <div style={{ fontSize: '14px', color: '#666', marginTop: '20px' }}>
        <p>Icons imported from:</p>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li><code>./icons/basic</code> - HeartIcon, StarIcon</li>
          <li><code>./icons/social</code> - GithubIcon, TwitterIcon</li>
        </ul>
      </div>
    </>
  )
}

export default App
