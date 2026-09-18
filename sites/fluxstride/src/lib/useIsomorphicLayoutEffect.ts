import { useEffect, useLayoutEffect } from 'react'

/**
 * useLayoutEffect cannot run on the server and React warns when it is rendered
 * there. Prerendering renders these components in Node, so fall back to
 * useEffect in that environment. In the browser the behaviour is unchanged.
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
