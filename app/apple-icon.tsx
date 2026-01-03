import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
    width: 180,
    height: 180,
};
export const contentType = "image/png";

// Image generation
export default async function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#000000",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <div
                        style={{
                            fontSize: 80,
                            color: "#8B0000",
                            fontFamily: "serif",
                            fontWeight: "bold",
                            display: "flex",
                        }}
                    >
                        花化
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
