import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SigninForm from './components/SigninForm/SigninForm';
import Register from './components/Register/Register';
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

const initialState = {
  input: '',
  imageURL: '',
  faceBox: {},
  route: 'signin',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
      super();
      this.state = initialState;
    }

    loadUser = (data) =>{
      this.setState({user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined:  data.joined
      }
      })
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
      app.models.predict(Clarifai.FACE_DETECT_MODEL,  this.state.input)
      .then(response => {
        if (response){
          fetch('http://localhost:3000/image',{
            method: 'put',
            headers:  {'Content-type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(err => console.log(err))
    }

    onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState(initialState)
      } else if (route === 'home'){
          this.setState({isSignedIn: true})
      }
      this.setState({route: route})
    }

  render() {
    const {isSignedIn, imageURL, route, faceBox, user} = this.state;
    return (
      <div className="App">
      <Particles className="Particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home'
          ?  <div>
              <Logo/>
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition faceBox={faceBox} imageURL={imageURL}/>
            </div>
          : (
              route === 'signin'
              ? <SigninForm loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
      }
      </div>
    );
  }
}

export default App;
