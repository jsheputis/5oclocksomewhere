import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="header">
      <h1 className="header-title">It's 5 O'Clock Somewhere</h1>
      <ThemeToggle />
    </header>
  )
}
