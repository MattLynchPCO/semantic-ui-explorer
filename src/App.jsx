import { Dropdown } from 'semantic-ui-react'
import './App.css'

const colourOptions = [
  { key: 'red', text: 'Red', value: 'red' },
  { key: 'green', text: 'Green', value: 'green' },
  { key: 'blue', text: 'Blue', value: 'blue' },
  { key: 'yellow', text: 'Yellow', value: 'yellow' },
  { key: 'purple', text: 'Purple', value: 'purple' },
]

function App() {
  return (
    <main className="explorer">
      <h1>Semantic UI Explorer</h1>
      <p className="subtitle">
        Exploring accessibility of UI controls in{' '}
        <a
          href="https://react.semantic-ui.com/"
          target="_blank"
          rel="noreferrer"
        >
          Semantic UI for React
        </a>
      </p>

      <section className="control-section">
        <h2>Dropdown</h2>
        <p className="description">
          A basic <code>Dropdown</code> component from Semantic UI React.
          Use browser devtools or a screen reader to inspect accessibility
          attributes such as <code>role</code>, <code>aria-expanded</code>,
          and <code>aria-haspopup</code>.
        </p>

        <div className="control-demo">
          <label htmlFor="colour-select" className="demo-label">
            Select a colour
          </label>
          <Dropdown
            id="colour-select"
            placeholder="Choose a colour"
            selection
            options={colourOptions}
          />
        </div>
      </section>
    </main>
  )
}

export default App
