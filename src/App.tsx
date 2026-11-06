import { useState } from 'react'
import ThemedCard from './components/ThemedCard'
import withTheme from './hoc/withTheme'
import type { ThemeType } from './types'
import './App.css'

const CardWithTheme = withTheme(ThemedCard)

function App() {
  const [theme, setTheme] = useState<ThemeType>('light')

  return (
    <main className="app">
      <h1>Переключение темы</h1>
      <p className="intro">Выберите тему оформления карточки.</p>

      <div className="theme-controls">
        <p role="status">Текущая тема: {theme === 'light' ? 'светлая' : 'тёмная'}</p>
        <button
          type="button"
          onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
        </button>
      </div>

      <CardWithTheme
        theme={theme}
        title="Карточка с темой"
        description="При переключении темы меняются фон и цвет текста. Содержимое карточки остаётся прежним."
      />
    </main>
  )
}

export default App
