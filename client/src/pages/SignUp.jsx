import React from 'react'
import Navbar from '../components/Landing/Navbar'
import SignUpItems from '../components/SignUp/SignUpItems'
import Card from '../components/Reusable/Card'
import CardHeader from '../components/Reusable/CardHeader'
import BannerImage from "../components/Reusable/BannerImage"

function SignUp() {
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
          <CardHeader className="relative -top-12 text-xl font-bold sm:text-2xl text-white bg-gradient-to-r from-[#7CBE83] to-[#7B9EBC] " text="Sign Up" />
          <SignUpItems />
        </Card>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default SignUp