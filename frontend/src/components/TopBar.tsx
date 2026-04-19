import type { NavLink } from '../types/prototype'

type TopBarProps = {
  links: NavLink[]
}

function TopBar({ links }: TopBarProps) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Medical Research Assistant</p>
        <a className="brand" href="#hero">
          MedScope AI
        </a>
      </div>
      <nav className="topnav" aria-label="Primary">
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default TopBar
