import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({apiKey: 'f346225446374b24b84eff3aae5b2f7d'});

const particlesOptions = {
  particles: {
    number:{
      value:60,
      density:{
      enable:true,
      value_area:600
    }
    }
  }
}

class App extends Component {
  constructor(){
      super();
      this.state = {
        input:'',
        imageURL:'',
        faceBox:{}
      }
    }

    calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      }
    }

    displayFaceBox = (faceBox) => {
      this.setState({faceBox: faceBox});
    }

    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }

    onButtonSubmit = (event) => {
      this.setState({imageURL: this.state.input});
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
    }

  render() {
    return (
      <div className="App">
      <Particles className="Particles" params={particlesOptions} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition faceBox={this.state.faceBox} imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;