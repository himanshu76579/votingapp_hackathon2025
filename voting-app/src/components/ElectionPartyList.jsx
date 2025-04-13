// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const ElectionPartyList = () => {
//   const { level } = useParams(); // local / state / country
//   const [parties, setParties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchParties = async () => {
//       try {
//         console.log("fething parties");
//         const res = await fetch(`http://localhost:8000/api/party/${level}`, {
//           credentials: "include"
//         });
        

//         console.log(" parties fetched");

//         if (!res.ok) throw new Error("Failed to fetch");

//         const data = await res.json();
//         console.log("parties are ",data);
//         setParties(data);
//         console.log("parties are ",parties);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchParties();
//   }, [level]);

//   return (
//     <div>
//       <h2>{level.charAt(0).toUpperCase() + level.slice(1)} Election - Parties</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : parties.length > 0 ? (
//         <ul>
//           {parties.map((party) => (
//             <li key={party._id}>
//               <strong>{party.name}</strong> - {party.symbol}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No parties available in your {level}.</p>
//       )}
//     </div>
//   );
// };

// export default ElectionPartyList;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ElectionPartyList.css";

const ElectionPartyList = () => {
  const { level } = useParams(); // local / state / country
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartyId, setSelectedPartyId] = useState(null);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/party/${level}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setParties(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, [level]);

  const handleVote = (partyId) => {
    setSelectedPartyId(partyId);
    // Optionally you can call an API to record the vote here
  };

  return (
    <div className="evm-container">
      <h2 className="evm-heading">
        {level.charAt(0).toUpperCase() + level.slice(1)} Election - Parties
      </h2>
      {loading ? (
        <p className="evm-loading">Loading...</p>
      ) : parties.length > 0 ? (
        <div className="evm-machine">
          {parties.map((party) => (
            <div className="evm-row" key={party._id}>
              <img
                src={party.logo || "/placeholder-symbol.png"}
                alt={`${party.name} symbol`}
                className="evm-symbol"
              />
              <div className="evm-name">{party.name}</div>
              <button
                className={`evm-vote-button ${
                  selectedPartyId === party._id ? "voted" : ""
                }`}
                onClick={() => handleVote(party._id)}
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="evm-empty">No parties available in your {level}.</p>
      )}
    </div>
  );
};

export default ElectionPartyList;




