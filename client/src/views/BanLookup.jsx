import React, {useState, useEffect} from "react";

const BanLookup = () => {
	const [userData, setUserData] = useState(null);
	const [userInput, setUserInput] = useState('');
	const [error, setError] = useState('');
	const [flUrls, setFlUrls] = useState([]); // New state for flUrls

	useEffect(() => {}, [userData]);

	const handleChange = (e) => {
		const value = e.target.value;
		setUserInput(value);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!userInput.trim()) {
			setError('Input can\'t be empty');
			return;
		}

		try {
			const response = await fetch(`http://127.0.0.1:3000/api/ban?banId=${userInput}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({"banID": userInput}),
			});

			const data = await response.json();

			if (!data.attributes || !data.attributes.uid) {
				setError('Ban not found');
				return
			}

			setUserData(data); // Set the fetched data to the userData state
			setFlUrls(data.evidence_urls); // Set the evidence urls
      console.log(data.evidence_urls)
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
												Username: <span>{userData ? userData.meta.player : ''}</span>
											</p>
											<p>
												SteamID 64: <span>{userData ? userData.attributes.identifiers[0].metadata.bans.SteamId : ''}</span>
											</p>

										</div>

										<div className="ban-info">
											<h1 className="header">Ban Information</h1>
											<p>
												Ban Reason: <span>{userData ? userData.attributes.reason : ''}</span>
											</p>
											<p>
												Ban Length: <span>{userData ? userData.attributes.expires : ''}</span>
											</p>
											{/*  <p>
											 Banned By: <span>{userData ? userData.steamid : ''}</span>
											 </p> */}
										</div>
									</div>
									<div className="user-avatar">
										<img src={userData ? userData.attributes.identifiers[0].metadata.profile.avatarfull : ''}/>
									</div>
								</div>
							</div>
							<div className="ban-evidence">
								{/* Render the evidence videos */}
								{flUrls.map((url) => (
									<video key={url} controls>
										<source type="video/mp4" src={url}/>
									</video>
								))}
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

export default BanLookup;
