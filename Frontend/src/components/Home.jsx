import React from 'react';
import Nav from './Nav'
import Footer from './Footer';
import Album from './Album';
import Policy from './Policy';
function Home() {
  return (
    <div>
      <Nav></Nav>
      <div>
        <Album></Album>
        <Policy></Policy>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
