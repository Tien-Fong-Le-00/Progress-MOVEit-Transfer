import "./App.css";

import { useState } from "react";

import FormLogin from "./FormLogin";
import FormUploadFile from "./FormUploadFile";

function App() {
  const [IsAuthorized, setIsAuthorized] = useState(false);

  return (
    <div className="App">
      {IsAuthorized ? (
        <FormUploadFile />
      ) : (
        <FormLogin setIsAuthorized={setIsAuthorized} />
      )}
    </div>
  );
}

export default App;
