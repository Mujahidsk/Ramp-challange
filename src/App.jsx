import { useEffect, useState } from "react";

export default function App() {
  const [flag, setFlag] = useState("");
  const [displayedFlag, setDisplayedFlag] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlag() {
      try {
        const response = await fetch("<YOUR_EXTRACTED_URL>"); // Replace with actual extracted URL
        const text = await response.text();
        setFlag(text);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flag:", error);
        setLoading(false);
      }
    }
    fetchFlag();
  }, []);

  useEffect(() => {
    if (flag) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedFlag((prev) => [...prev, flag[index]]);
        index++;
        if (index === flag.length) clearInterval(interval);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [flag]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {displayedFlag.map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
