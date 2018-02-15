import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageURL, faceBox}) => {
    return(
      <div className="center ma">
        <div className="absolute mt2">
          <img id='inputimage' src={imageURL} alt='' width='500px' height='auto'/>
          <div className='bounding_box' style={{top:faceBox.topRow, bottom:faceBox.bottomRow, right:faceBox.rightCol, left:faceBox.leftCol}}></div>
        </div>
      </div>
    )
}

export default FaceRecognition;
