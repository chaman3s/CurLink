import type { PipelineStep } from '../types/prototype'
import SectionHeading from './SectionHeading'

type PipelineSectionProps = {
  steps: PipelineStep[]
}

function PipelineSection({ steps }: PipelineSectionProps) {
  return (
    <section className="pipeline-section" id="pipeline">
      <SectionHeading
        eyebrow="Workflow"
        title="A clear path from question to answer."
        narrow
      />

      <div className="pipeline-grid">
        {steps.map((step, index) => (
          <article className="pipeline-card" key={step.title}>
            <span className="pipeline-index">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PipelineSection
