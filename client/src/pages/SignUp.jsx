import React from 'react'
import Navbar from '../components/Landing/Navbar'
import SignUpItems from '../components/SignUp/SignUpItems'
import Card from '../components/Reusable/Card'
import BannerImage from "../components/Reusable/BannerImage"

function SignUp() {
  return (
    <div>
      <header>
        <Navbar/>
      </header>
      <main>
        <BannerImage />
        <Card>
          <SignUpItems/>
        </Card>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default SignUp