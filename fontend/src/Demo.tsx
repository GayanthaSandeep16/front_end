import React, { useState } from 'react';
import './css/style.css';

const Demo: React.FC = () => {
  const models = ['Model 1', 'Model 2', 'Model 3'];
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleModelClick = (model: string) => {
    setSelectedModel((prev) => (prev === model ? null : model)); // Toggle selection
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Uploaded File:', file.name);
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
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Demo;
