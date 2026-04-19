import { useState } from 'react'
import TopBar from './components/TopBar'
import WorkspaceSection from './components/WorkspaceSection'
import {
  answerViews,
  contextSignals,
  navLinks,
  researchModes,
  researchPrompt,
  sidePanels,
} from './data/prototypeContent'
import type { ResearchMode } from './types/prototype'
import './App.css'

function App() {
  const [activeMode, setActiveMode] = useState<ResearchMode>('Evidence synthesis')

  return (
    <div className="app-shell">
      <TopBar links={navLinks} />

      <main>
        <WorkspaceSection
          modes={researchModes}
          activeMode={activeMode}
          answerView={answerViews[activeMode]}
          prompt={researchPrompt}
          contextSignals={contextSignals}
          sidePanels={sidePanels}
          onModeChange={setActiveMode}
        />
        </main>
    </div>
  )
}

export default App
