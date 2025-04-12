import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ElectionPartyList = () => {
  const { level } = useParams(); // local / state / country
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        console.log("fething parties");
        const res = await fetch(`http://localhost:8000/api/party/${level}`, {
          credentials: "include"
        });
        

        console.log(" parties fetched");

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        console.log("parties are ",data);
        setParties(data);
        console.log("parties are ",parties);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, [level]);

  return (
    <div>
      <h2>{level.charAt(0).toUpperCase() + level.slice(1)} Election - Parties</h2>
      {loading ? (
        <p>Loading...</p>
      ) : parties.length > 0 ? (
        <ul>
          {parties.map((party) => (
            <li key={party._id}>
              <strong>{party.name}</strong> - {party.symbol}
            </li>
          ))}
        </ul>
      ) : (
        <p>No parties available in your {level}.</p>
      )}
    </div>
  );
};

export default ElectionPartyList;
