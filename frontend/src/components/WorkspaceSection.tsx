import { useMemo, useState, type FormEvent } from 'react'
import type { AnswerView, ResearchMode, SidePanel } from '../types/prototype'
import SectionHeading from './SectionHeading'
import SignalChipList from './SignalChipList'

type WorkspaceSectionProps = {
  modes: ResearchMode[]
  activeMode: ResearchMode
  answerView: AnswerView
  prompt: string
  contextSignals: string[]
  sidePanels: SidePanel[]
  onModeChange: (mode: ResearchMode) => void
}

function WorkspaceSection({
  modes,
  activeMode,
  answerView,
  prompt,
  contextSignals,
  sidePanels,
  onModeChange,
}: WorkspaceSectionProps) {
  const [draftPrompt, setDraftPrompt] = useState(prompt)
  const [draftContext, setDraftContext] = useState(contextSignals.join(', '))
  const [submittedPrompt, setSubmittedPrompt] = useState(prompt)
  const [submittedContext, setSubmittedContext] = useState(contextSignals)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const parsedContext = useMemo(
    () =>
      draftContext
        .split(/,|\n/)
        .map((item) => item.trim())
        .filter(Boolean),
    [draftContext],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmittedPrompt(draftPrompt.trim())
    setSubmittedContext(parsedContext.length > 0 ? parsedContext : contextSignals)
    setHasSubmitted(true)
  }

  const handleReset = () => {
    setDraftPrompt(prompt)
    setDraftContext(contextSignals.join(', '))
    setSubmittedPrompt(prompt)
    setSubmittedContext(contextSignals)
    setHasSubmitted(false)
  }

  const responseSummary = hasSubmitted
    ? `Draft updated for your question: "${submittedPrompt}". The answer uses the attached context below and the selected response mode.`
    : answerView.summary

  return (
    <section className="workspace-grid" id="workspace">
      <div className="workspace-main">
        <SectionHeading
          eyebrow="Workspace"
          title="Ask with the right context attached."
        />

        <form className="composer-card" onSubmit={handleSubmit}>
          <div className="mode-switcher" role="tablist" aria-label="Answer modes">
            {modes.map((mode) => (
              <button
                key={mode}
                className={mode === activeMode ? 'mode-button active' : 'mode-button'}
                onClick={() => onModeChange(mode)}
                type="button"
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="composer-layout">
            <div className="prompt-box">
              <label className="prompt-label" htmlFor="research-prompt">
                Research prompt
              </label>
              <textarea
                className="prompt-input"
                id="research-prompt"
                onChange={(event) => setDraftPrompt(event.target.value)}
                required
                rows={4}
                value={draftPrompt}
              />
            </div>

            <div className="context-box">
              <label className="prompt-label" htmlFor="attached-context">
                Attached context
              </label>
              <input
                className="context-input"
                id="attached-context"
                onChange={(event) => setDraftContext(event.target.value)}
                placeholder="Type context separated by commas"
                value={draftContext}
              />
              {parsedContext.length > 0 && <SignalChipList items={parsedContext} soft />}
            </div>
          </div>

          <div className="form-actions">
            <button className="primary-button" type="submit">
              Generate answer
            </button>
            <button className="secondary-button" onClick={handleReset} type="button">
              Reset
            </button>
          </div>
        </form>

        <div className="response-card">
          <div className="response-header">
            <div>
              <p className="eyebrow">Structured Answer</p>
              <h3>{answerView.heading}</h3>
            </div>
            <span className="response-badge">
              {hasSubmitted ? 'Updated draft' : 'Source-backed draft'}
            </span>
          </div>

          <p className="response-summary">{responseSummary}</p>

          {hasSubmitted && (
            <div className="submitted-context">
              <p className="prompt-label">Using context</p>
              <SignalChipList items={submittedContext} soft />
            </div>
          )}

          <div className="response-points">
            {answerView.bullets.map((bullet) => (
              <article key={bullet}>
                <span />
                <p>{bullet}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <aside className="workspace-side">
        {sidePanels.map((panel) => (
          <div
            className={panel.highlighted ? 'side-card highlight' : 'side-card'}
            key={panel.eyebrow}
          >
            <p className="eyebrow">{panel.eyebrow}</p>
            <ul className="detail-list">
              {panel.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    </section>
  )
}

export default WorkspaceSection
