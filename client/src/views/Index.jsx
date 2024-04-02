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

      // const metadata = data.attributes.identifiers[1].metadata; -- Dont uncomment othervise, this will cause huge clusterfuck
      // const reason = data.attributes.reason -- Dont uncomment othervise, this will cause huge clusterfuck
      
      // setBanReason(reason) -- same like above
      setUserData(data); // Set the fetched data to the userData state
  
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
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
                    <img src={userData ? userData.attributes.identifiers[1].metadata.profile.avatarfull : ''} alt="User Avatar" />
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
                  placeholder="SteamID 64"
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
