import "./App.css";

import Cookies from "js-cookie";
import { useState } from "react";

import FormLogin from "./FormLogin";
import FormUploadFile from "./FormUploadFile";

function App() {
  const [IsAuthorized, setIsAuthorized] = useState(false);
  const access_token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");

  return (
    <div className="App">
      {IsAuthorized || access_token || refresh_token ? (
        <FormUploadFile />
      ) : (
        <FormLogin setIsAuthorized={setIsAuthorized} />
      )}
    </div>
  );
}

export default App;
