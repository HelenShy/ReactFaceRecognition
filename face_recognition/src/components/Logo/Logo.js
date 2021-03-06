import React from 'react';
import Tilt from 'react-tilt';
import "./Logo.css";
import blue_eye from "./blue_eye.png";

const Logo = () => {
    return(
      <div className="ma4 mt0 ">
      <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
       <div className="Tilt-inner pa4"> <img src={blue_eye} alt='logo' style={{height:90}}/> </div>
      </Tilt>
      </div>
    )
}

export default Logo;
