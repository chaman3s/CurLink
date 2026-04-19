import type { ArchitectureItem } from '../types/prototype'
import SectionHeading from './SectionHeading'

type ArchitectureSectionProps = {
  items: ArchitectureItem[]
}

function ArchitectureSection({ items }: ArchitectureSectionProps) {
  return (
    <section className="architecture-section" id="architecture">
      <SectionHeading
        eyebrow="System Blueprint"
        title="Simple MERN structure for a research assistant."
      />

      <div className="architecture-grid">
        {items.map((item) => (
          <article className="architecture-card" key={item.title}>
            <p className="stack-label">{item.label}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ArchitectureSection
