import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1280
    return {
      width: w,
      isMobile: w < 640,
      isTablet: w >= 640 && w < 1024,
      isDesktop: w >= 1024,
    }
  })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    function handleResize() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const w = window.innerWidth
        setSize({
          width: w,
          isMobile: w < 640,
          isTablet: w >= 640 && w < 1024,
          isDesktop: w >= 1024,
        })
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
