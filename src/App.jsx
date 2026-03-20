import { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
} from 'react-aria-components'
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
  const [selectedColourMui, setSelectedColourMui] = useState('')
  const [eventLogMui, setEventLogMui] = useState([])
  const [selectedColourAria, setSelectedColourAria] = useState('')
  const [eventLogAria, setEventLogAria] = useState([])

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

  const addMuiEvent = (name, details = '') => {
    const time = new Date().toLocaleTimeString()
    const suffix = details ? `: ${details}` : ''

    setEventLogMui((previousEvents) => [
      `${time} - ${name}${suffix}`,
      ...previousEvents,
    ])
  }

  const handleMuiChange = (event) => {
    const nextValue = event.target.value
    setSelectedColourMui(nextValue)
    addMuiEvent('onChange (selection)', nextValue || 'none')
  }

  const clearLogMui = () => {
    setEventLogMui([])
  }

  const addAriaEvent = (name, details = '') => {
    const time = new Date().toLocaleTimeString()
    const suffix = details ? `: ${details}` : ''

    setEventLogAria((previousEvents) => [
      `${time} - ${name}${suffix}`,
      ...previousEvents,
    ])
  }

  const handleAriaChange = (value) => {
    setSelectedColourAria(value)
    addAriaEvent('onChange (selection)', value || 'none')
  }

  const clearLogAria = () => {
    setEventLogAria([])
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

        <section className="control-section">
          <h2>Dropdown - Material UI</h2>
          <p className="description">
            The same dropdown using the{' '}
            <a
              href="https://mui.com/material-ui/react-select/"
              target="_blank"
              rel="noreferrer"
            >
              Material UI
            </a>{' '}
            <code>Select</code> component. Both libraries coexist on the same
            page; compare the generated markup and accessibility attributes with
            the Semantic UI versions.
          </p>

          <div className="inspector-panel" aria-live="polite">
            <h3>Interaction Inspector</h3>
            <p className="selected-value">
              Selected value:{' '}
              <strong>{selectedColourMui || 'none'}</strong>
            </p>

            <div className="event-log-header">
              <h4>Event Log</h4>
              <button
                type="button"
                className="clear-log-button"
                onClick={clearLogMui}
                disabled={eventLogMui.length === 0}
              >
                Clear log
              </button>
            </div>
            <div className="event-log-shell">
              {eventLogMui.length === 0 ? (
                <p className="empty-log">No events yet. Interact with the dropdown.</p>
              ) : (
                <ol className="event-log">
                  {eventLogMui.map((eventEntry, index) => (
                    <li key={`${eventEntry}-${index}`}>{eventEntry}</li>
                  ))}
                </ol>
              )}
            </div>
          </div>

          <div className="control-demo">
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="mui-colour-select-label">Select a colour</InputLabel>
              <Select
                labelId="mui-colour-select-label"
                id="mui-colour-select"
                value={selectedColourMui}
                label="Select a colour"
                onChange={handleMuiChange}
                onOpen={() => addMuiEvent('onOpen')}
                onClose={() => addMuiEvent('onClose')}
                onFocus={() => addMuiEvent('onFocus')}
                onBlur={() => addMuiEvent('onBlur')}
                displayEmpty
              >
                {colourOptions.map((option) => (
                  <MenuItem key={option.key} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </section>

        <section className="control-section">
          <h2>Dropdown - React Aria</h2>
          <p className="description">
            The same dropdown using the{' '}
            <a
              href="https://react-spectrum.adobe.com/react-aria/"
              target="_blank"
              rel="noreferrer"
            >
              React Aria
            </a>{' '}
            <code>Select</code> component from Adobe. React Aria provides
            fully accessible, behaviour-focused primitives; compare the
            generated markup and ARIA attributes with the other implementations.
          </p>

          <div className="inspector-panel" aria-live="polite">
            <h3>Interaction Inspector</h3>
            <p className="selected-value">
              Selected value:{' '}
              <strong>{selectedColourAria || 'none'}</strong>
            </p>

            <div className="event-log-header">
              <h4>Event Log</h4>
              <button
                type="button"
                className="clear-log-button"
                onClick={clearLogAria}
                disabled={eventLogAria.length === 0}
              >
                Clear log
              </button>
            </div>
            <div className="event-log-shell">
              {eventLogAria.length === 0 ? (
                <p className="empty-log">No events yet. Interact with the dropdown.</p>
              ) : (
                <ol className="event-log">
                  {eventLogAria.map((eventEntry, index) => (
                    <li key={`${eventEntry}-${index}`}>{eventEntry}</li>
                  ))}
                </ol>
              )}
            </div>
          </div>

          <div className="control-demo">
            <AriaSelect
              className="aria-select"
              placeholder="Choose a colour"
              selectedKey={selectedColourAria}
              onSelectionChange={handleAriaChange}
              onOpenChange={(isOpen) => addAriaEvent(isOpen ? 'onOpen' : 'onClose')}
              onFocus={() => addAriaEvent('onFocus')}
              onBlur={() => addAriaEvent('onBlur')}
            >
              <Label className="demo-label">Select a colour</Label>
              <Button className="aria-select-button">
                <SelectValue className="aria-select-value" />
                <span aria-hidden="true" className="aria-select-caret">▾</span>
              </Button>
              <Popover className="aria-select-popover">
                <ListBox className="aria-select-listbox">
                  {colourOptions.map((option) => (
                    <ListBoxItem
                      key={option.key}
                      id={option.value}
                      className="aria-select-option"
                    >
                      {option.text}
                    </ListBoxItem>
                  ))}
                </ListBox>
              </Popover>
            </AriaSelect>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
