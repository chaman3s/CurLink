type SectionHeadingProps = {
  eyebrow: string
  title: string
  narrow?: boolean
}

function SectionHeading({
  eyebrow,
  title,
  narrow = false,
}: SectionHeadingProps) {
  return (
    <div className={narrow ? 'section-heading narrow' : 'section-heading'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  )
}

export default SectionHeading
