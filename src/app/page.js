"use client"; // Needed for React hooks in Next.js (App Router)

import { useEffect, useState } from "react";

export default function Page() {
  const [queries, setQueries] = useState([]); // Store WebSocket data

  useEffect(() => {
    const socket = new WebSocket("wss://your-websocket-url"); // Replace with actual WebSocket URL

    socket.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data); // Parse WebSocket JSON data

        // Append new data to queries array
        setQueries((prevQueries) => [...prevQueries, newData]);
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    return () => socket.close(); // Cleanup WebSocket on unmount
  }, []);

  return (
    <div className="container">
      <h2>Live Efficiency Reports</h2>
      <div className="cards">
        {queries.length === 0 ? (
          <p>No data received yet...</p>
        ) : (
          queries.map((query, index) => (
            <div key={index} className="card">
              <h3>Efficiency Score: {query.efficiency_score.toFixed(2)}</h3>
              <p>{query.analyze_issue}</p>
              <p>
                <strong>Booked Time:</strong>{" "}
                {new Date(query.booked_time).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
