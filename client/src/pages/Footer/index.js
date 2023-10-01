import React from 'react'

function Footer() {
  return (
    <>
      <footer>
        <div className='container grid1 flex justify-between'>
          <div className='box'>
            <img src='./assets/logo1.png' alt='' />
            <p>Ovo je privatna biblioteka gde možete naći vaše omiljene knjige.
            </p>
            <div className='SocailIcon'>
              <i class="ri-facebook-circle-fill"></i>
              <i class="ri-instagram-fill"></i>
              <i class="ri-twitter-fill"></i>
              <i class="ri-youtube-fill"></i>
              <i class="ri-pinterest-fill"></i>
            </div>
          </div>
          <div className='box'>
            <h2>Stupite u kontakt sa nama</h2>
            <p>Možete nas kontatkirati na sledeće načine:</p>
            <div className='icon'>
              <i class='ri-map-pin-2-fill'></i>
              <label>Locija: Kragujevac</label>
            </div>
            <div className='icon'>
              <i class='ri-phone-fill'></i>
              <label>Telefon: 000000</label>
            </div>
            <div className='icon'>
              <i class='ri-mail-fill'></i>
              <label>Email: biblioteka@gmail.com</label>
            </div>
          </div>
        </div>
        <div className='legal container'>
          <p></p>
          <label>
            Anđela Kuč, Kragujevac 2023.
          </label>
        </div>
      </footer>
    </>
  )
}

export default Footer