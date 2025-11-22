import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Byunhwa Floral Artistry'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Load font (Playfair Display)
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2'
  ).then((res) => res.arrayBuffer())

  // Load background image
  // Using the deployed URL to ensure access in the edge environment
  const imageUrl = 'https://byeonhwa.vercel.app/images/florist_portrait.jpg'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000', // Explicit black background
          position: 'relative',
        }}
      >
        {/* Background Image */}
        <img
            src={imageUrl} // Satori can load from URL if runtime allows, or we can use the buffer
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.6,
            }}
        />
        
        {/* Dark Overlay */}
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
            }}
        />

        {/* Content */}
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
            }}
        >
            <div
                style={{
                    fontFamily: '"Playfair Display"',
                    fontSize: 100,
                    color: 'white',
                    marginBottom: 20,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                }}
            >
                BYUNHWA
            </div>
            <div
                style={{
                    fontFamily: '"Playfair Display"',
                    fontSize: 32,
                    color: '#e5e7eb', // gray-200
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                }}
            >
                FLORAL ARTISTRY & CLASSES
            </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Playfair Display',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
