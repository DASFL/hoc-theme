import { Component } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import withTheme from './withTheme'
import type { ThemeProps } from '../types'

describe('withTheme', () => {
  it('передаёт текущую тему и остальные props без изменений', () => {
    interface CardProps extends ThemeProps {
      title: string
      data: { count: number }
      onClick: () => void
    }
    const Card = vi.fn((props: CardProps) => <p>{props.title}: {props.theme}</p>)
    const WrappedCard = withTheme(Card)
    const props: CardProps = {
      theme: 'light', title: 'Карточка', data: { count: 3 }, onClick: () => {}
    }

    expect(renderToStaticMarkup(<WrappedCard {...props} />)).toContain('light')
    expect(Card.mock.calls[0][0]).toEqual(props)
    expect(Card.mock.calls[0][0].data).toBe(props.data)
    expect(Card.mock.calls[0][0].onClick).toBe(props.onClick)

    expect(renderToStaticMarkup(<WrappedCard {...props} theme="dark" />)).toContain('dark')
    expect(Card.mock.calls[1][0].theme).toBe('dark')
  })

  it('поддерживает классовые компоненты', () => {
    class Card extends Component<ThemeProps> {
      render() { return <p>{this.props.theme}</p> }
    }
    const WrappedCard = withTheme(Card)
    expect(renderToStaticMarkup(<WrappedCard theme="dark" />)).toContain('dark')
  })

  it('сохраняет displayName исходного компонента в имени обёртки', () => {
    function Card({ theme }: ThemeProps) { return <p>{theme}</p> }
    Card.displayName = 'ProfileCard'
    expect(withTheme(Card).displayName).toBe('withTheme(ProfileCard)')
  })

  it('использует имя функции, если displayName не задан', () => {
    function Card({ theme }: ThemeProps) { return <p>{theme}</p> }
    expect(withTheme(Card).displayName).toBe('withTheme(Card)')
  })
})
