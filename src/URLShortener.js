import React, { useState, useEffect } from "react";

const Button = ({ onClick, children, style }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      color: "white",
      backgroundColor: "#8A2BE2",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      ...style,
    }}
  >
    {children}
  </button>
);

const Input = ({ value, onChange, placeholder, style }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      border: "2px solid #8A2BE2",
      borderRadius: "5px",
      outline: "none",
      ...style,
    }}
  />
);

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [clicks, setClicks] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Define loading state
  const [error, setError] = useState(""); // Define error state

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleShorten = async () => {
    setIsLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch(
        "https://url-shortener-backend-ashen.vercel.app/api/shorten",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ longUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
      setClicks(null);
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  const fetchClicks = async () => {
    const code = shortUrl.split("/").pop();
    try {
      const response = await fetch(
        `https://url-shortener-backend-ashen.vercel.app/api/url/${code}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch clicks");
      }
      const data = await response.json();
      if (data && data.clicks !== undefined) {
        setClicks(data.clicks);
      }
    } catch (err) {
      console.error("Failed to fetch clicks:", err);
    }
  };

  // Implement handleClick for opening URL and updating clicks
  const handleClick = () => {
    if (shortUrl) {
      window.open(shortUrl, "_blank", "noopener,noreferrer");
      fetchClicks(); // Update clicks when opening the link
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            color: "white",
            textAlign: "center",
            marginBottom: "30px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          URL Shortener
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <Input
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter a long URL"
          />
        </div>
        <Button
          onClick={handleShorten}
          style={{ width: "100%", marginBottom: "20px" }}
        >
          {isLoading ? "Loading..." : "Shorten"} {/* Show loading text */}
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error */}
        {shortUrl && (
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "5px",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Input
                value={shortUrl}
                onChange={() => {}}
                style={{ flex: 1, marginRight: "10px" }}
              />
              <Button onClick={handleCopy} style={{ padding: "10px" }}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
              }}
            >
              <span>Clicks: {clicks}</span>
              <Button
                onClick={handleClick} // Open link and update clicks
                style={{ backgroundColor: "transparent", color: "#8A2BE2" }}
              >
                Open Link
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
