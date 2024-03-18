import React, { useState, useRef } from 'react';
import axios from 'axios';
import './gallerystyle.css';

function DragandDropFile() {
  const [files, setFiles] = useState([]); // State to store selected files
  const fileInputRef = useRef(null); // Ref for file input element

  // Handle file drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files); // Convert FileList to array
    setFiles(droppedFiles);
    uploadImages(droppedFiles); // Call API to upload images
  };

  // Handle file input change event
  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
    setFiles(selectedFiles);
    uploadImages(selectedFiles); // Call API to upload images
  };

  // Handle click on "Drag and drop file" button
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically trigger click on file input
  };

  // Prevent default behavior for drag events
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Simulate API call to upload images
  const uploadImages = (images) => {
    // Simulate API call using setTimeout
    setTimeout(() => {
      console.log('Uploading images:', images);
      // You can make a real API call here using axios
      // Example: axios.post('https://api.example.com/upload', formData)
    }, 1000); // Simulating 1 second delay for API call
  };

  return (
    <div className="file-upload-container">
      {/* File drop area */}
      <div
        className="file-drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleButtonClick}
      >
        <div>Drop files here, or click to select files</div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="file-input"
          multiple // Allow selection of multiple files
        />
      </div>

      {/* Display selected files */}
      <div className="selected-files">
        {files.map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)} // Create URL for each selected file
            alt={`File ${index}`}
            className="selected-file"
          />
        ))}
      </div>
    </div>
  );
}

export default DragandDropFile;
