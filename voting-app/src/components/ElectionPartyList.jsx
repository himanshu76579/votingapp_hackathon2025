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

  const handleVote = async (partyId) => {
    try {
      console.log("handling vote")
      const res = await fetch(`http://localhost:8000/api/party/vote/${partyId}/${level}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSelectedPartyId(partyId);
      alert("Vote successfully recorded!");
    } catch (err) {
      alert(err.message);
    }
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
                src={party.symbol || "/placeholder-symbol.png"}
                alt={`${party.name} symbol`}
                className="evm-symbol"
              />
              <div className="evm-name">{party.name}</div>
              <button
                className={`evm-vote-button ${
                  selectedPartyId === party._id ? "voted" : ""
                }`}
                onClick={() => handleVote(party._id)}
                disabled={selectedPartyId !== null}
              >
                {selectedPartyId === party._id ? "Voted" : "Vote"}
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
