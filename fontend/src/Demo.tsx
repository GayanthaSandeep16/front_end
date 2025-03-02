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
        setFile(null); // Reset file if invalid
      }
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      setErrorMessage('Please login first');
      return;
    }
    if (!selectedModel) {
      setErrorMessage('Please select a model');
      return;
    }
    if (!file) {
      setErrorMessage('Please select a file');
      return;
    }

    setUploadStatus('uploading');
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('files', file); // 'files' matches your server expectation
    formData.append('clerkUserId', user.id);
    formData.append('model', selectedModel);

    try {
      const token = await getToken();
      const response = await fetch('http://localhost:3000/api/submit-data', {
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
      setErrorMessage(error.message || 'An error occurred during upload');
      console.error(error);
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

        <h2 className="select-model-text">Upload your CSV data file</h2>
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
          {file && (
            <p className="mt-2 text-green-600">
              Selected file: {file.name}
            </p>
          )}
        </div>

        {errorMessage && <p className="error-message text-red-600">{errorMessage}</p>}

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={uploadStatus === 'uploading'}
        >
          {uploadStatus === 'uploading' ? 'Uploading...' : 'Submit'}
        </button>

        {uploadStatus === 'success' && (
          <p className="success-message text-green-600">Submission successful!</p>
        )}
        {uploadStatus === 'error' && !errorMessage && (
          <p className="error-message text-red-600">Upload failed. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default Demo;