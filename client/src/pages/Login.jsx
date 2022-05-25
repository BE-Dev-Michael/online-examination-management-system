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
        <Navbar />
      </header>
      <main>
        {/* //* BannerImage is a reusable component */}
        {/* //* Modify the src value if maglalagay ng ibang image */}
        <BannerImage src="https://wallpapercave.com/wp/wp4072615.jpg" />
        <Card>
          <CardHeader className="relative -top-12 text-xl font-bold sm:text-2xl text-white bg-gradient-to-r from-blue-500 to-cyan-400" text="Sign In" />
          <LoginItems />
        </Card>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default Login