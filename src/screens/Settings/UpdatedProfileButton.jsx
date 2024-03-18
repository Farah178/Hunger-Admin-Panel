import React from 'react'
import '../../screens/Settings/settings.css'
function UpdatedProfileButton() {

    const handleIconClick = () => {
        // Trigger click event on the file input element
        document.getElementById('fileInput').click();
      };
    
      const handleFileChange = (event) => {
        // Handle file change event here, for example, you can upload the file
        const selectedFile = event.target.files[0];
        console.log('Selected file:', selectedFile);
      };
    
  return (
    <div className="profile-picture-upload" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
      {/* Hidden file input element */}
      <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />

      {/* Profile icon */}
      <div className="icon" onClick={handleIconClick}>
            <img
              src={'https://via.placeholder.com/150'} 
              alt="icon"
              style={{
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
              }}
              onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = 'https://img.freepik.com/free-photo/red-gift-tag-price-ticket-with-red-ribbon-isolated-white_1101-2266.jpg?w=1800&t=st=1707896796~exp=1707897396~hmac=d8cb9dbcb33daebdc61816b0f459a94081c770115bccc6f3047aeeac79359c05'; // Set default image source
              }}
          />
        {/* Human icon */}
        {/* <i className="bi bi-person-circle icon-logo" style={{ fontSize: '70px', cursor: 'pointer' }}></i> */}
      </div>
    </div>

  )
}

export default UpdatedProfileButton
