import type { ThemeProps } from '../types'

interface ThemedCardProps extends ThemeProps {
  title: string
  description: string
}

function ThemedCard({ theme, title, description }: ThemedCardProps) {
  return (
    <article className={`themed-card themed-card--${theme}`}>
      <p className="theme-label">Тема: {theme}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  )
}

export default ThemedCard
