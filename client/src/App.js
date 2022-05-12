import Landing from "./pages/Landing"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Faculty from "./pages/Faculty"
import Student from "./pages/Student"
import About from "./pages/About"
import { Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/About" element={<About/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/faculty/*" element={<Faculty/>}/>
        <Route path='/student/*' element={<Student/>}/>
      </Routes>
    </RecoilRoot>
  );
}

export default App;
