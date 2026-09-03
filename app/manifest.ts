import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Small Steps Confidence Programme',
    short_name: 'Small Steps',
    description:
      'An eight-week supportive journey helping adults rebuild confidence and take their next manageable step.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#123b56',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
