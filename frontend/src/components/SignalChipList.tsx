type SignalChipListProps = {
  items: string[]
  soft?: boolean
}

function SignalChipList({ items, soft = false }: SignalChipListProps) {
  return (
    <div className="signal-stack">
      {items.map((item) => (
        <span className={soft ? 'signal-chip soft' : 'signal-chip'} key={item}>
          {item}
        </span>
      ))}
    </div>
  )
}

export default SignalChipList
