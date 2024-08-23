import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
