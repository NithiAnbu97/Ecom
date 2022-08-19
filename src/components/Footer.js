import React from 'react'

const Footer = () => {
  return <>
  <div className='footer-main'>
      <div className='customer-care'>
          <div>
          <i class="fa-solid fa-truck"></i>
          <h3>Fast Delivery</h3>
          </div>
          <div>
          <i class="fa-solid fa-tag"></i>
          <h3>8 days easy return</h3>
          </div>
          <div>
          <i class="fa-solid fa-location-dot"></i>
          <h3>Accepting orders 24/7</h3>
          </div>
      </div>
      <div className='footer-details'>
        <div className='footer-row1'>
          <div>
            <h3>What's In store</h3>
            <p>Men</p>
            <p>Women</p>
            <p>Kids</p>
            <p>New Arrivals</p>
          </div>
          <div>
            <h3>Brand Partnership</h3>
            <p>Nike</p>
            <p>Adidas</p>
            <p>Campus</p>
            <p>Puma</p>
          </div>
          <div>
            <h3>Customer Support</h3>
            <p>24/7 Support</p>
            <p>Payment Options</p>
            <p>FAQ's</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
        <div className='footer-row2'>
          <div className='contact'>
            <h1>Contact Us</h1>
            <a className='btn btn-outline-danger text-white' href="mailto:nithianbu97@gmail.com" rel="noopener noreferrer" target="_blank">
              Say Hello
            </a>
          </div>
          <div className='social-media'>
            <div className='brand'>
            <i class="fa-brands fa-whatsapp"></i>
            <i class="fa-brands fa-facebook-f"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-twitter"></i>
            </div>
            <p>Design & Built by NithiAnbu</p>
            <span>	&copy; NithiAnbu 2022</span>
          </div>
        </div>
      </div>
  </div>
  </>
}

export default Footer