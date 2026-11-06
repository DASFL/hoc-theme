import type { ComponentType } from 'react'
import type { ThemeProps } from '../types'

function withTheme<P extends ThemeProps>(WrappedComponent: ComponentType<P>) {
  function WithTheme(props: P) {
    return <WrappedComponent {...props} />
  }

  WithTheme.displayName = `withTheme(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return WithTheme
}

export default withTheme
