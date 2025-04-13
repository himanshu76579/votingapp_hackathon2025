import React, { useState, useEffect } from 'react';
import lokSabhaData from '../data/indian_general_elections.json';
import stateElectionData from '../data/indian_legislative_elections.json';
import presidentialElectionData from '../data/indian_presidential_elections.json';
import './PreviousElection.css';

const allIndianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh"
];

const PreviousElection = () => {
  const [lokSabhaYear, setLokSabhaYear] = useState('');
  const [stateYear, setStateYear] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [presidentYear, setPresidentYear] = useState('');

  const [availableLokYears, setAvailableLokYears] = useState([]);
  const [availableStateYears, setAvailableStateYears] = useState([]);
  const [availablePresidentYears, setAvailablePresidentYears] = useState([]);

  useEffect(() => {
    const lokYears = Array.from(new Set(lokSabhaData.map(e => e.year))).sort((a, b) => b - a);
    const stateYears = Array.from(new Set(stateElectionData.map(e => e.year))).sort((a, b) => b - a);
    const presidentYears = Array.from(new Set(presidentialElectionData.map(e => e.year))).sort((a, b) => b - a);

    setAvailableLokYears(lokYears);
    setAvailableStateYears(stateYears);
    setAvailablePresidentYears(presidentYears);
  }, []);

  const selectedLokSabha = lokSabhaData.find(e => String(e.year) === String(lokSabhaYear));
  const selectedStateElection = stateElectionData.find(
    e => String(e.year) === String(stateYear) && e.state.toUpperCase() === selectedState.toUpperCase()
  );
  const selectedPresident = presidentialElectionData.find(e => String(e.year) === String(presidentYear));

  return (
    <div className="previous-elections-container">
      <h2 className="section-heading">🗳 Previous Election Results</h2>
      <div className="previous-elections-grid">

        {/* Lok Sabha Elections */}
        <div className="previous-election-card">
          <div className="card-header">
            <h3 className="card-title">Lok Sabha Elections</h3>
            <div className="selectors">
              <select value={lokSabhaYear} onChange={(e) => setLokSabhaYear(e.target.value)}>
                <option value="">Year</option>
                {availableLokYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {!lokSabhaYear ? (
            <p className="helper-text">Please select a year.</p>
          ) : selectedLokSabha ? (
            <div className="election-details">
              <p><span>Term:</span> {selectedLokSabha.lok_sabha_term}</p>
              <p><span>Total Seats:</span> {selectedLokSabha.total_seats}</p>
              <p><span>Voter Turnout:</span> {selectedLokSabha.voter_turnout_percent}%</p>
              <p><span>Ruling Party:</span> {selectedLokSabha.ruling_party}</p>
              <p><span>Prime Minister:</span> {selectedLokSabha.prime_minister}</p>
            </div>
          ) : (
            <p>No Lok Sabha data for {lokSabhaYear}.</p>
          )}
        </div>




        {/* State Assembly Elections */}
        <div className="previous-election-card state-assembly-election-card">
          <div className="card-header">
            <h3 className="card-title">State Assembly Elections</h3>
            <div className="selectors">
              <select value={stateYear} onChange={(e) => setStateYear(e.target.value)}>
                <option value="">Year</option>
                {availableStateYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                <option value="">-- Select State --</option>
                {allIndianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          {!selectedState || !stateYear ? (
            <p className="helper-text">Please select a state and year.</p>
          ) : selectedStateElection ? (
            <div className="state-election-details">
              <p><span>State:</span> {selectedStateElection.state}</p>
              <p><span>Year:</span> {selectedStateElection.year}</p>
              <p><span>Total Seats:</span> {selectedStateElection.total_seats}</p>
              <p><span>Voter Turnout:</span> {selectedStateElection.voter_turnout_percent}%</p>
              <p><span>Ruling Party:</span> {selectedStateElection.ruling_party}</p>
              <p><span>Seats Won:</span> {Object.values(selectedStateElection.seats_won)[0]}</p>
            </div>
          ) : (
            <p>No state election data for {selectedState} in {stateYear}.</p>
          )}
        </div>




        {/* Presidential Elections */}
        <div className="previous-election-card">
          <div className="card-header">
            <h3 className="card-title">President Elections</h3>
            <div className="selectors">
              <select value={presidentYear} onChange={(e) => setPresidentYear(e.target.value)}>
                <option value="">Year</option>
                {availablePresidentYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {!presidentYear ? (
            <p className="helper-text">Please select a year.</p>
          ) : selectedPresident ? (
            <div className="election-details">
              <p><span>President:</span> {selectedPresident.president}</p>
              <p><span>Party:</span> {selectedPresident.party}</p>
              <p><span>Result:</span> {selectedPresident.result}</p>
              <p><span>Opposition:</span> {selectedPresident.opposition}</p>
            </div>
          ) : (
            <p>No presidential election data for {presidentYear}.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default PreviousElection;