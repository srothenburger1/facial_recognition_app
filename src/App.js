import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import 'tachyons';
import './App.css';


const app = new Clarifai.App({
  apiKey: '78dc783dbd924834a8831d6d029649ef'
 });

const particlesOptions = {
  particles: {
    number: {
      value:30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data)=> {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row *height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottomRow * height)
    }
  }

  displayFaceBox = (box)=>{
    this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit =()=>{
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
    .then(response => this.calculateFaceLocation(response))
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="App">
      <Particles className='particles'
      params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank  />
      <ImageLinkForm 
      onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}


export default App;
