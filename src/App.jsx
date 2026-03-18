import { useState } from 'react'
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
  const [selectedColour, setSelectedColour] = useState('')
  const [eventLog, setEventLog] = useState([])

  const addEvent = (name, details = '') => {
    const time = new Date().toLocaleTimeString()
    const suffix = details ? `: ${details}` : ''

    setEventLog((previousEvents) => [
      `${time} - ${name}${suffix}`,
      ...previousEvents,
    ])
  }

  const handleChange = (_, data) => {
    const nextValue = typeof data.value === 'string' ? data.value : ''
    setSelectedColour(nextValue)
    addEvent('onChange (selection)', nextValue || 'none')
  }

  const clearLog = () => {
    setEventLog([])
  }

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

        <div className="inspector-panel" aria-live="polite">
          <h3>Interaction Inspector</h3>
          <p className="selected-value">
            Selected value:{' '}
            <strong>{selectedColour || 'none'}</strong>
          </p>

          <div className="event-log-header">
            <h4>Event Log</h4>
            <button
              type="button"
              className="clear-log-button"
              onClick={clearLog}
              disabled={eventLog.length === 0}
            >
              Clear log
            </button>
          </div>
          {eventLog.length === 0 ? (
            <p className="empty-log">No events yet. Interact with the dropdown.</p>
          ) : (
            <ol className="event-log">
              {eventLog.map((eventEntry, index) => (
                <li key={`${eventEntry}-${index}`}>{eventEntry}</li>
              ))}
            </ol>
          )}
        </div>

        <div className="control-demo">
          <label htmlFor="colour-select" className="demo-label">
            Select a colour
          </label>
          <Dropdown
            id="colour-select"
            placeholder="Choose a colour"
            selection
            value={selectedColour}
            options={colourOptions}
            onFocus={() => addEvent('onFocus')}
            onBlur={() => addEvent('onBlur')}
            onOpen={() => addEvent('onOpen')}
            onClose={() => addEvent('onClose')}
            onChange={handleChange}
          />
        </div>
      </section>
    </main>
  )
}

export default App
