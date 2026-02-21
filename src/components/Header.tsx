import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  cityCount: number
}

export function Header({ cityCount }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-text">
        <h1 className="header-title">It's 5 O'Clock Somewhere</h1>
        <p className="header-subtitle">
          Right now, <strong>{cityCount}</strong> cities are at happy hour
        </p>
      </div>
      <ThemeToggle />
    </header>
  )
}
