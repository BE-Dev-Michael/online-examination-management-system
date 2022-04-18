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
        <Navbar/>
      </header>
      <main>
        {/* //* Modify the src value if maglalagay ng ibang image */}
        <BannerImage src="https://wallpapercave.com/wp/wp4072615.jpg"/>
        <Card>
        <CardHeader className="relative -top-12 bg-indigo-600" text="Welcome" />
          <SignUpItems/>
        </Card>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default SignUp