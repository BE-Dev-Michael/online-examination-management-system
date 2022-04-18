import React from 'react'
import Navbar from '../components/Landing/Navbar'
import LoginItems from '../components/Login/LoginItems'
import Card from '../components/Reusable/Card'
import CardHeader from '../components/Reusable/CardHeader'
import BannerImage from "../components/Reusable/BannerImage"

function Login() {
  return (
    <div>
      <header>
        <Navbar/>
      </header>
      <main>
        <BannerImage />
        <Card>
          <LoginItems/>
        </Card>
      </main>
      <footer>
    
      </footer>
    </div>
  )
}

export default Login