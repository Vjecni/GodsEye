import React, { useState, useEffect } from "react";

const Index = () => {

  const [userData, setUserData] = useState(null);
  const [banReason, setBanReason] = useState(null)
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');


  // This is unfinished, basic idea is to provide Error CODE/ID when error occurs so it is easier to
  // identify error and resolve it
  const errorDrop = (ErrID) => {
    const AP100 = 'Api Fault'
    const S205 = 'Server Error'
    const W29 = 'Wrong Ban ID'

    switch(ErrID) {
      case AP100: 
        return `API has encountered an unexpected condition which prevented it from fulfilling the request.`
      break;
      
      case S205: 
        return `The server encountered error and was unable to resolve the request`
      break;
      
      case W29 :
        return  `Provided ban id does not exist in our database. Please check if you have entered correct`
      break;

      default:
        return  `An unknown error occurred. If this persists please Developers (Vjecni/Mango).`
      break;
    }
  }

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
