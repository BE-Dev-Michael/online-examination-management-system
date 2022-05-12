import Landing from "./pages/Landing"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import EmailSent from "./components/SignUp/EmailSent"
import VerifyEmail from "./components//SignUp/VerifyEmail"
import Faculty from "./pages/Faculty"
import Student from "./pages/Student"
import About from "./pages/About"
import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil'

function App() {
  // localStorage.removeItem("token");
  const user = localStorage.getItem("token");
  console.log(user)
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/About" element={<About/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signup/verify/:email" element={<EmailSent/>} />
        <Route path="/api/users/:id/verify/:token" element={<VerifyEmail/>} />
        <Route path="/faculty/*" element={<Faculty/>}/>
        <Route path='/student/*' element={<Student/>}/>
      </Routes>
    </RecoilRoot>
  );
}

export default App;
