import React from 'react';
import "./ImageLinkForm.css";

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
      <div>
        <p className="f3 center">{'This face detector will find the faces in your pictures'}</p>
        <div className="center">
          <div className="form center pa4 w-30 shadow-5 br3">
            <input onChange={onInputChange} className="w-70 pa2 f4" type='text'/>
            <button onClick={onButtonSubmit} className="f4 link grow ph3 pv2 dib white dib bg-light-purple">Detect</button>
          </div>
        </div>
      </div>
    )
}

export default ImageLinkForm;
