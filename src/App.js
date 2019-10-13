import React from "react";
import UploadImage from "./components/FileUpload/UploadImage";
import "@material/react-material-icon/dist/material-icon.css";
import InputExample from "./components/Forms/InputExample";

function App() {
  return (
    <div>
      <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
        <UploadImage />
      </div>
      <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
        <InputExample />
      </div>
    </div>
  );
}

export default App;
