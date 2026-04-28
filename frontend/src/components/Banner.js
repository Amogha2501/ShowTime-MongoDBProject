import React from "react";

function Banner() {
    return (
        <div style={{
            width: "100%",
            height: 250,
            background: "linear-gradient(to right, #ff4d4d, #ff1a1a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 30,
            fontWeight: "bold"
        }}>
            🎬 Book Your Favorite Movies Now!
        </div>
    );
}

export default Banner;