import React, { useEffect, useState } from "react";

const ElectionLevel = () => {
  const [elections, setElections] = useState({
    local: false,
    state: false,
    country: false
  });

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const res = await fetch("/api/election-levels", {
          credentials: "include" // include cookies (JWT)
        });
        const data = await res.json();
        setElections(data);
      } catch (err) {
        console.error("Error fetching election data:", err);
      }
    };

    fetchElectionData();
  }, []);

  return (
    <div>
      <h2>Election Options</h2>

      {elections.local && (
        <button onClick={() => window.location.href = "/local-election"}>
          Vote in Local Election
        </button>
      )}
      {elections.state && (
        <button onClick={() => window.location.href = "/state-election"}>
          Vote in State Election
        </button>
      )}
      {elections.country && (
        <button onClick={() => window.location.href = "/country-election"}>
          Vote in National Election
        </button>
      )}

      {!elections.local && !elections.state && !elections.country && (
        <p>No elections currently in your area.</p>
      )}
    </div>
  );
};

export default ElectionLevel;
