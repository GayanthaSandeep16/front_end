import React, { useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import './css/style.css';

const Demo: React.FC = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const models = ['Model 1', 'Model 2', 'Model 3'];
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleModelClick = (model: string) => {
    setSelectedModel((prev) => (prev === model ? null : model));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv') {
        setFile(selectedFile);
        setErrorMessage(null);
      } else {
        setErrorMessage('Only CSV files are allowed');
      }
    }
  };

     const handleSubmit = async () => {
    if (!selectedModel || !file ) {
      setErrorMessage('Please select a model and file');
      return;
    }

     const handleSubmit = async () => {
    if (!selectedModel ) {
      setErrorMessage('Please select a model');
      return;
    }
    
    if (!file) {
      setErrorMessage('Please select a file');
      return;
    }
    if (!user){
      setErrorMessage('Please login first');
      return;
    }
  };

    setUploadStatus('uploading');
    setErrorMessage(null);

    const formData = new FormData();
    // Change the key to 'files' if your server expects that:
    formData.append('files', file);
    formData.append('clerkUserId', user.id);
    formData.append('model', selectedModel);

    try {
      const token = await getToken();
      const response = await fetch("http://localhost:3000/api/submit-data", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setUploadStatus('success');
    } catch (error: any) {
      setUploadStatus('error');
      setErrorMessage(error.message);
      console.log(error);
    }
  };
  return (
      <div className="page-container">
        <div className="content-container">
          <h2 className="select-model-text">Please select the model</h2>
          <div className="models-section">
            {models.map((model, index) => (
                <div
                    key={index}
                    className={`model-card ${selectedModel === model ? 'selected' : ''}`}
                    onClick={() => handleModelClick(model)}
                >
                  <h2 className="model-title">{model}</h2>
                  <p className="model-description">Details about {model}...</p>
                </div>
            ))}
          </div>

          <h2 className="select-model-text">Upload your CSV data file.</h2>
          <div className="drag-drop-section">
            <p className="text-gray-600 text-lg">Drag and Drop here</p>
            <p className="mt-4">or</p>
            <label className="select-file-label">
              Select file
              <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".csv"
              />
            </label>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={uploadStatus === 'uploading'}
          >
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Submit'}
          </button>

          {/* Display a spinner when uploading */}
          {uploadStatus === 'uploading' && <div className="spinner"></div>}

          {uploadStatus === 'success' && (
              <p className="success-message">Submission successful!</p>
          )}
        </div>
      </div>
  );
};

export default Demo;
