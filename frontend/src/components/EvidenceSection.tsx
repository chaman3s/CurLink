import type { EvidenceCard } from '../types/prototype'
import SectionHeading from './SectionHeading'

type EvidenceSectionProps = {
  cards: EvidenceCard[]
}

function EvidenceSection({ cards }: EvidenceSectionProps) {
  return (
    <section className="evidence-section" id="evidence">
      <SectionHeading
        eyebrow="Evidence"
        title="Key sources stay close to the answer."
        narrow
      />

      <div className="evidence-grid">
        {cards.map((card) => (
          <article className="evidence-card" key={card.title}>
            <div className="evidence-meta">
              <span>{card.tag}</span>
              <span>{card.year}</span>
            </div>
            <h3>{card.title}</h3>
            <p className="journal">{card.journal}</p>
            <p>{card.takeaway}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default EvidenceSection
