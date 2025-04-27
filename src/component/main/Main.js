import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./main.css"; // Import your CSS file for styling

function Main() {
  const location = useLocation();
  const navigate = useNavigate();

  // Default image URL (can be your custom default image)
  const defaultImage = "/Images/download.png";

  // Initialize image state with the picture from location.state or localStorage (if available)
  const [image, setImage] = useState(
    localStorage.getItem("profileImage") ||
      location.state?.picture ||
      defaultImage
  );
  const [imageError, setImageError] = useState(null);

  const { email, name } = location.state || {}; // <-- important!

  console.log(name, image, email); // Debug: check if name and picture are coming

  // Logout function to clear localStorage and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userpass");
    localStorage.removeItem("googleEmail");
    localStorage.removeItem("googlePicture");
    localStorage.removeItem("profileImage"); // Clear the stored image
    localStorage.removeItem("profileName"); // Clear the stored name

    navigate("/"); // Redirect to the login page
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result; // Get the base64 string

        // Store the base64 image in localStorage
        localStorage.setItem("profileImage", base64Image);
        setImage(base64Image); // Set the uploaded image to state
        setImageError(null); // Reset any error if upload is successful
      };

      reader.onerror = () => {
        setImageError("Error uploading image.");
      };

      reader.readAsDataURL(file); // Convert image to a base64 string
    }
  };

  // Handle image click (open the hidden file input)
  const handleImageClick = () => {
    document.getElementById("file-input").click(); // Trigger file input click
  };

  return (
    <div className="main-cont">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center-main">
          {/* If image exists, display it; otherwise, show "No Image Found" */}
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-32 h-32 img-stlying-profile rounded-full object-cover mb-4 border-4 border-blue-400"
              onClick={handleImageClick} // Add onClick handler to the image
            />
          ) : (
            <p>No Image Found</p>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden-file-input" // Hide the file input
          />

          {/* Display error message if any */}
          {imageError && <p className="text-red-500 mt-2">{imageError}</p>}
        </div>

        {/* Display the user's name */}
        <p className="text-2xl font-semibold text-center mt-4">{name}</p>
        <p className="text-lg text-gray-600 text-center mt-2">{email}</p>
      </div>

      <div>
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Main;
