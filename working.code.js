import React, { useState, useEffect } from "react";

const Index = () => {
  
  const [data, setData] = useState([]); // Array to store fetched data
  const [inputSteamID, setInputSteamID] = useState("");
  const [error, setError] = useState("");

  
  const username = data.username
  const steamid = data.steamid
  const banReason = data.banReason
  const banLength = data.banLength
  const bannedBy = data.bannedBy 

  const getData = async () => {
    try {
      const response = await fetch("./src/json/data.json"); // Replace with your API endpoint
      const jsonData = await response.json();
      setData(jsonData); // Update the entire data array with fetched API data
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <>
      <main>
        <div className="aurora ar-1"></div>
        <div className="aurora ar-2"></div>
        <div className="aurora ar-3"></div>
        <div className="aurora ar-4"></div>

        <div className="container">
          <div className="holder-content">
            <div className="data-window">
              <div className="string-data">
                <div className="user-data">
                  <div className="user-data-text">
                    <div className="user-info">
                      <h1 className="header">User Information</h1>
                      
                      <p>
                        Username: <span>{username}</span>
                      </p>
                      <p>
                        SteamID 64: <span>{steamid}</span>
                      </p>
                      
                    </div>

                    <div className="ban-info">
                      <h1 className="header">Ban Information</h1>
                      <p>
                        Ban Reason: <span>{banReason}</span>
                      </p>
                      <p>
                        Ban Length: <span>{banLength}</span>
                      </p>
                      <p>
                        Banned By: <span>{bannedBy}</span>
                      </p>
                    </div>
                  </div>
                  <div className="user-avatar">
                    <img src='' alt="User Avatar" />
                  </div>
                </div>
              </div>
              <div className="ban-evidence">
                <video controls>
                  <source src="" />
                </video>
              </div>
            </div>
            <input
                type="text"
                className="input userInput"
                placeholder="SteamID 64"
            />
            <button className="btn" onClick={getData}>
              Get Data
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
