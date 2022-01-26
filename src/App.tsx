import "./App.css";

import Cookies from "js-cookie";
import { useState } from "react";

import FormLogin from "./FormLogin";
import FormUploadFile from "./FormUploadFile";

function App() {
  const [IsAuthorized, setIsAuthorized] = useState(false);
  const refresh_token = Cookies.get("refresh_token");

  return (
    <div className="App">
      {IsAuthorized || refresh_token ? (
        <FormUploadFile />
      ) : (
        <FormLogin setIsAuthorized={setIsAuthorized} />
      )}
    </div>
  );
}

export default App;
