import React, { useState } from "react";


const EvidenceUploader = () => {

  const [videoFile, setVideoFile] = useState(null);
  const [banId, setBanId] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null); // State to store the uploaded file URL

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !banId) {
      setError('Please fill in both fields');
      return;
    }
    setError('');
    setUploading(true);
  
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('banId', banId);
  
    try {
      const response = await fetch('http://127.0.0.1:3000/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Video uploaded successfully!');
        setUploadStatus('Video uploaded successfully!');
        
        // Log the response to check if the file URL is included
        const responseData = await response.json();
        console.log('Response data:', responseData);
  
        // Set the file URL received from the server
        setFileUrl(responseData.fileUrl);
      } else {
        console.error('Failed to upload video');
        setUploadStatus('Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadStatus('Error uploading video. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  


  return (
    <>
      <section className="ev-container">
        <div className="ev-content">
          <form className="ev-body" onSubmit={handleSubmit}>
            <div className="ev-upload-box">
                <input  type="file"
                className="ev-evidence-input"
                name="video"
                onChange={handleFileChange} />
                <p>Press to upload Evidence</p>
                {uploading && <span>Uploading...</span>}
                {!uploading && <span>{videoFile ? videoFile.name : 'No file selected'}</span>}
            </div>
            <div className="ev-url-holder">
              <a className="return-link" href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl ? fileUrl : 'File URL'}</a>
            </div>
            <div className="ev-footer">
                <input type="text"
                className="input ev-input"
                placeholder="Ban Id"
                value={banId}
                onChange={(e) => setBanId(e.target.value)} />
                <button type="submit" className="btn ev-btn">
                  {uploading ? 'Uploading...' : 'Upload Evidence'}
                </button>
            </div>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {uploadStatus && <p>{uploadStatus}</p>}
          {uploadStatus === 'Video uploaded successfully!' && <p>Video uploaded successfully!</p>}
        </div>
      </section>
    </>
  );
};
export default EvidenceUploader;
