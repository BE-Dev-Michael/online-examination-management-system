import Landing from "./pages/Landing"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { Routes, Route} from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
  );
}

export default App;
