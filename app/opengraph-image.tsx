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
                    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                {/* Logo Characters */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                        marginBottom: '48px',
                    }}
                >
                    <span
                        style={{
                            fontSize: 140,
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            letterSpacing: '0.05em',
                        }}
                    >
                        變
                    </span>
                    <span
                        style={{
                            fontSize: 140,
                            fontWeight: 'bold',
                            color: '#8B0000',
                            letterSpacing: '0.05em',
                        }}
                    >
                        花
                    </span>
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: 56,
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        marginBottom: '24px',
                        letterSpacing: '0.3em',
                    }}
                >
                    BYUNHWA
                </div>

                {/* Description */}
                <div
                    style={{
                        fontSize: 32,
                        color: '#999999',
                        textAlign: 'center',
                        letterSpacing: '0.05em',
                    }}
                >
                    꽃을 통해 일상의 특별한 순간을 디자인합니다
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
