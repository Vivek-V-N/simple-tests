import React, { Component, PropTypes } from 'react'
import Slider from 'react-slick'
import '../css/login.css'

export default class LoginCarousel extends Component {
  render() {
    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div className="login-carousel-item mui--text-center">
          <span className="fa fa-snowflake-o login-carousel-icon"></span>
          <br/>
          <h1> Carousel slide 1 </h1>
          <p> Text for Carousel 1 </p>
        </div>
        <div className="login-carousel-item mui--text-center">
          <span className="fa fa-wpexplorer login-carousel-icon"></span>
          <br/>
          <h1> Carousel slide 2 </h1>
          <p> Text for Carousel 2 </p>
        </div>
        <div className="login-carousel-item mui--text-center">
          <span className="fa fa-automobile login-carousel-icon"></span>
          <br/>
          <h1> Carousel slide 3 </h1>
          <p> Text for Carousel 3 </p>
        </div>
      </Slider>
    );
  }
};