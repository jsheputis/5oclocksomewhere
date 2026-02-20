interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search cities..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
