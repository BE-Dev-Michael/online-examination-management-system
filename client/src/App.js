import Landing from "./pages/Landing"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import EmailSent from "./components/SignUp/EmailSent"
import VerifyEmail from "./components//SignUp/VerifyEmail"
import Faculty from "./pages/Faculty"
import Student from "./pages/Student"
import About from "./pages/About"
import ProtectedRoute from "./ProtectedRoute"
import { Routes, Route } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil'
import tokenState from './components/Login/tokenAtom'

function App() {
  //* If user is not authenticated, it cannot bypass a protected component
  const user = useRecoilValue(tokenState)
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/About" element={<About/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signup/verify/:email" element={<EmailSent/>} />
      <Route path="/api/users/:id/verify/:token" element={<VerifyEmail/>} />
      <Route path="/faculty/*" element={<ProtectedRoute user={user}><Faculty/></ProtectedRoute>}/>
      <Route path='/student/*' element={<Student/>}/>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
