import React, { useState, useEffect } from "react";

const Index = () => {

  const [userData, setUserData] = useState(null);
  const [banReason, setBanReason] = useState(null)
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
  }, [userData, banReason]);
  
  const handleChange = (e) => {
    const value = e.target.value;

    if (!value.trim()) {
      setError("Input can't be empty!");
      return 
    }
    else {
      setError('');
    }
    setUserInput(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) {
      setError('Input can\'t be empty');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api?banId=${userInput}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "banID": userInput }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      if (!data.attributes || !data.attributes.uid) {
        setError('Ban not found');
        return
      }

      setUserData(data); // Set the fetched data to the userData state

      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);

    // If error occurs, nature of error is about to be checked here after which response will be
    // provided with according error CODE/ID 

      setError('Failed to fetch data - Check BAN ID and try again or contact message to the DEVS');
    }
  };

  return (
    <>
      <main>
        {/*
        <div className="aurora ar-1"></div>
        <div className="aurora ar-2"></div>
        <div className="aurora ar-3"></div>
        <div className="aurora ar-4"></div>
        */}

        <div className="container">
          <form className="holder-content" onSubmit={handleSubmit}>
            <div className="data-window">
              <div className="string-data">
                <div className="user-data">
                  <div className="user-data-text">
                    <div className="user-info">
                      <h1 className="header">User Information</h1>
                      
                      <p>
                        Username: <span>{userData ? userData.attributes.identifiers[1].metadata.profile.personaname : ''}</span>
                      </p>
                      <p>
                        SteamID 64: <span>{userData ? userData.attributes.identifiers[1].metadata.profile.steamid : ''}</span>
                      </p>
                      
                    </div>

                    <div className="ban-info">
                      <h1 className="header">Ban Information</h1>
                      <p>
                        Ban Reason: <span>{userData ? userData.attributes.reason : ''}</span>
                      </p>
                      <p>
                        Ban Length: <span>{userData ? userData.steamid : ''}</span>
                      </p>
                      <p>
                        Banned By: <span>{userData ? userData.steamid : ''}</span>
                      </p>
                    </div>
                  </div>
                  <div className="user-avatar">
                    <img src={userData ? userData.attributes.identifiers[1].metadata.profile.avatarfull : ''} />
                  </div>
                </div>
              </div>
              <div className="ban-evidence">
                <video controls>
                  <source src="" />
                </video>
              </div>
            </div>
           <div className="data-win-footer">
            <input
                  type="text"
                  className="input userInput"
                  placeholder="Ban ID"
                  value={userInput}
                  onChange={handleChange}
              />
              <button className="btn" type="submit">
                Get Data
              </button>
           </div>
           {error && <p className="error">{error}</p>}
          </form>
        </div>
      </main>
    </>
  );
};

export default Index;
