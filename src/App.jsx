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
  const [selectedColourA11y, setSelectedColourA11y] = useState('')
  const [eventLogA11y, setEventLogA11y] = useState([])
  const [isA11yOpen, setIsA11yOpen] = useState(false)

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

  const addA11yEvent = (name, details = '') => {
    const time = new Date().toLocaleTimeString()
    const suffix = details ? `: ${details}` : ''

    setEventLogA11y((previousEvents) => [
      `${time} - ${name}${suffix}`,
      ...previousEvents,
    ])
  }

  const handleA11yOpen = () => {
    setIsA11yOpen((previousOpen) => {
      if (previousOpen) {
        return previousOpen
      }

      addA11yEvent('onOpen')
      return true
    })
  }

  const handleA11yClose = () => {
    setIsA11yOpen((previousOpen) => {
      if (!previousOpen) {
        return previousOpen
      }

      addA11yEvent('onClose')
      return false
    })
  }

  const handleA11yTriggerClick = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (isA11yOpen) {
      handleA11yClose()
      return
    }

    handleA11yOpen()
  }

  const handleA11ySelect = (value) => {
    setSelectedColourA11y(value)
    addA11yEvent('onChange (selection)', value)
    setIsA11yOpen(false)
  }

  const clearLogA11y = () => {
    setEventLogA11y([])
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

      <div className="control-grid">
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
            <div className="event-log-shell">
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
          </div>

          <div className="control-demo">
            <label htmlFor="colour-select" className="demo-label">
              Select a colour
            </label>
            <Dropdown
              id="colour-select"
              placeholder="Choose a colour"
              selection
              openOnFocus={false}
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

        <section className="control-section">
          <h2>Dropdown - Accessible</h2>
          <p className="description">
            This version augments Semantic UI Dropdown rendering so the trigger is
            a native <code>button</code>, the option container is a <code>ul</code>,
            and each option is a <code>button</code> inside a <code>li</code>.
          </p>

          <div className="inspector-panel" aria-live="polite">
            <h3>Interaction Inspector</h3>
            <p className="selected-value">
              Selected value:{' '}
              <strong>{selectedColourA11y || 'none'}</strong>
            </p>

            <div className="event-log-header">
              <h4>Event Log</h4>
              <button
                type="button"
                className="clear-log-button"
                onClick={clearLogA11y}
                disabled={eventLogA11y.length === 0}
              >
                Clear log
              </button>
            </div>
            <div className="event-log-shell">
              {eventLogA11y.length === 0 ? (
                <p className="empty-log">No events yet. Interact with the dropdown.</p>
              ) : (
                <ol className="event-log">
                  {eventLogA11y.map((eventEntry, index) => (
                    <li key={`${eventEntry}-${index}`}>{eventEntry}</li>
                  ))}
                </ol>
              )}
            </div>
          </div>

          <div className="control-demo">
            <label htmlFor="colour-select-a11y" className="demo-label">
              Select a colour
            </label>

            <Dropdown
              id="colour-select-a11y"
              className="a11y-dropdown"
              icon={null}
              openOnFocus={false}
              open={isA11yOpen}
              onOpen={handleA11yOpen}
              onClose={handleA11yClose}
              onFocus={() => addA11yEvent('onFocus')}
              onBlur={() => addA11yEvent('onBlur')}
              trigger={(
                <button
                  type="button"
                  className="a11y-dropdown-trigger"
                  aria-haspopup="listbox"
                  aria-expanded={isA11yOpen}
                  aria-controls="colour-select-a11y-listbox"
                  onClick={handleA11yTriggerClick}
                >
                  <span className="text">
                    {selectedColourA11y
                      ? colourOptions.find((option) => option.value === selectedColourA11y)?.text
                      : 'Choose a colour'}
                  </span>
                  <span className="a11y-dropdown-caret" aria-hidden="true">
                    ▾
                  </span>
                </button>
              )}
            >
              <Dropdown.Menu
                id="colour-select-a11y-listbox"
                as="ul"
                className="a11y-dropdown-menu menu"
                role="listbox"
              >
                {colourOptions.map((option) => (
                  <li key={option.value} className="a11y-dropdown-item" role="none">
                    <button
                      type="button"
                      className="a11y-option-button"
                      role="option"
                      aria-selected={selectedColourA11y === option.value}
                      onClick={(event) => {
                        event.stopPropagation()
                        handleA11ySelect(option.value)
                      }}
                    >
                      {option.text}
                    </button>
                  </li>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
