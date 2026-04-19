import type { Metric } from '../types/prototype'

type HeroSectionProps = {
  metrics: Metric[]
}

function HeroSection({ metrics }: HeroSectionProps) {
  return (
    <section className="hero-grid" id="hero">
      <div className="hero-copy">
        <p className="eyebrow">AI-Powered Medical Research Assistant</p>
        <h1>Clear medical research, in one simple workspace.</h1>
        <p className="hero-text">
          Add patient context, review evidence, and get a structured answer
          that is easy to follow.
        </p>

        <div className="hero-actions">
          <a className="primary-button" href="#workspace">
            Open workspace
          </a>
          <a className="secondary-button" href="#architecture">
            View blueprint
          </a>
        </div>

        <div className="hero-metrics">
          {metrics.map((metric) => (
            <article key={metric.title}>
              <strong>{metric.title}</strong>
              <span>{metric.description}</span>
            </article>
          ))}
        </div>
      </div>

    </section>
  )
}

export default HeroSection
