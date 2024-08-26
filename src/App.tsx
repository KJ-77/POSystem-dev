import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/signin";
import { Amplify } from "aws-amplify";
import { amplifyConfig } from "./config/amplifyConfig";

function App() {
  Amplify.configure(amplifyConfig);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
