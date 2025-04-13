// import React, { useEffect, useState } from "react";

// const ElectionLevel = () => {
//   const [elections, setElections] = useState({
//     local: false,
//     state: false,
//     country: false
//   });

//   console.log("ElectionLevel component rendered");

//   useEffect(() => {
//     const fetchElectionData = async () => {
//       try {
//         console.log("try to fetch data");
//         const res = await fetch("http://localhost:8000/api/elections", {
//           credentials: "include"
//         });
//         const data = await res.json();
//         setElections(data);
//         console.log("data is", elections);
//       } catch (err) {
//         console.error("Error fetching election data:", err);
//       }
//     };

//     fetchElectionData();
//   }, []);

//   return (
//     <div>
//       <h2>Election Options</h2>

//       {elections.local && (
//         <button onClick={() => window.location.href = "/election/local"}>
//           Vote in Local Election
//         </button>
//       )}
//       {elections.state && (
//         <button onClick={() => window.location.href = "/election/state"}>
//           Vote in State Election
//         </button>
//       )}
//       {elections.country && (
//         <button onClick={() => window.location.href = "/election/country"}>
//           Vote in National Election
//         </button>
//       )}

//       {!elections.local && !elections.state && !elections.country && (
//         <p>No elections currently in your area.</p>
//       )}
//     </div>
//   );
// };

// export default ElectionLevel;

import React, { useEffect, useState } from "react";
import "./ElectionLevel.css"; // import the CSS

const ElectionLevel = () => {
  const [elections, setElections] = useState({
    local: false,
    state: false,
    country: false
  });

  console.log("ElectionLevel component rendered");

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        console.log("try to fetch data");
        const res = await fetch("http://localhost:8000/api/elections", {
          credentials: "include"
        });
        const data = await res.json();
        setElections(data);
        console.log("data is", data);
      } catch (err) {
        console.error("Error fetching election data:", err);
      }
    };

    fetchElectionData();
  }, []);

  return (
    <div className="election-container">
      <h2 className="election-heading">Ongoing Elections</h2>

      <div className="election-buttons">
        {elections.local && (
          <button className="election-btn" onClick={() => window.location.href = "/election/local"}>
            Vote in Local Election
          </button>
        )}
        {elections.state && (
          <button className="election-btn" onClick={() => window.location.href = "/election/state"}>
            Vote in State Election
          </button>
        )}
        {elections.country && (
          <button className="election-btn" onClick={() => window.location.href = "/election/country"}>
            Vote in National Election
          </button>
        )}

        {!elections.local && !elections.state && !elections.country && (
          <p className="no-election">No elections currently in your area.</p>
        )}
      </div>
    </div>
  );
};

export default ElectionLevel;
