import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Byunhwa - 변화 變花';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#000000',
                    position: 'relative',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                {/* Background Image with Overlay */}
                <img
                    src="https://byunhwa.vercel.app/images/florist_portrait.jpg"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.6,
                    }}
                    alt="background"
                />

                {/* Dark Overlay */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.4)',
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
                        position: 'relative',
                    }}
                >
                    {/* Title */}
                    <div
                        style={{
                            fontSize: 100,
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            marginBottom: '24px',
                            letterSpacing: '0.2em',
                        }}
                    >
                        BYUNHWA
                    </div>

                    {/* Subtitle */}
                    <div
                        style={{
                            fontSize: 32,
                            color: '#E5E7EB',
                            textAlign: 'center',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                        }}
                    >
                        FLORAL ARTISTRY & CLASSES
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
