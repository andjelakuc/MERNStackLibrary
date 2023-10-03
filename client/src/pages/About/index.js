import React from 'react'

function About() {
  return (
    <>
      <section className='home bg-third'>
        <div className='container flex'>
          <div className='left '>
            <div className='img'>
              <img src='./assets/darkacademiia.jpeg' alt='' />
            </div>
          </div>
          <div className='right topMarign text-black'>
            <h1>
              DOBRODOŠLI U <br />
              BIBLIOTEKU
            </h1>
            
            <div className='SocailIcon'>
              <i className="ri-facebook-circle-fill"></i>
              <i className="ri-instagram-fill"></i>
              <i className="ri-twitter-fill"></i>
              <i className="ri-youtube-fill"></i>
              <i className="ri-pinterest-fill"></i>
              
            </div>
            <p>Naša biblioteka je očaravajuće mesto koje pruža obilje intelektualnog bogatstva i kulturne raznolikosti svojim posetiocima. 
              Smestila se u srcu grada, okružena zelenilom parka i 
              arhitektonskom lepotom svoje zgrade. Ova biblioteka je ne samo izvor znanja, već i zajednički prostor za okupljanje zajednice.</p>

            <p>U unutrašnjosti biblioteke, posetioci će pronaći prostrane čitaonice sa udobnim stolicama i velikim prozorima koji 
              omogućavaju prirodno svetlo da obasjava prostor. Police su ispunjene brojnim knjigama koje pokrivaju sve žanrove i tematske oblasti, 
              a računarske stanice su dostupne za istraživanje interneta ili rad na projektima.</p>
            
          </div>
        </div>
      </section>
    </>
  )
}

export default About