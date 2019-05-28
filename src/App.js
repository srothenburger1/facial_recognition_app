import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
// import Rank from './Components/Rank/Rank';
import DemographicDisplay from './Components/FaceRecognition/DemographicDisplay'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import 'tachyons';
import './App.css';

const app = new Clarifai.App({
	apiKey: '78dc783dbd924834a8831d6d029649ef',
});

const particlesOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 90,
			},
		},
	},
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
      box: {},
      demographics:{
        age:{
          age:'',
          percentage:''
        },
        demographic:{
          demographic:'',
          percentage:''
        },
        gender:{
          gender:'',
          percentage:''
        }
      },
			route: 'signin',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: '',
			},
		};
	}

	loadUser = data => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined,
			},
		});
	};

	calculateFaceData = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(data)
    const receivedDemographic = {
      demographic:{
        demographic:data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts[0].name,
        percentage:data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts[0].value *100
      },
      age:{
        age:data.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name,
        percentage:data.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].value *100
      },
      gender:{
        gender:data.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0].name,
        percentage:data.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0].value *100
      }
    }
    this.setState({demographics:receivedDemographic})
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
    const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceBox = box => {
		this.setState({ box: box });
  };

	onInputChange = event => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		app.models
			.predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceData(response)))
      .catch(err => console.log(err));
      
	};

	onRouteChange = route => {
		if (route === 'signout') {
      this.setState({ isSignedIn: false, imageUrl:'',demographics:{
        age:{
          age:'',
          percentage:''
        },
        demographic:{
          demographic:'',
          percentage:''
        },
        gender:{
          gender:'',
          percentage:''
        }
      } });
		} else if (route === 'home') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, imageUrl, route, box,demographics } = this.state;
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				{route === 'home' ? (
					<div>
						<Logo />
						{/* <Rank name={this.state.user.name} entries={this.state.user.entries} /> */}
						<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
						{demographics.age.age !== "" ? <DemographicDisplay demographics={demographics}/>: null}
            <FaceRecognition box={box} imageUrl={imageUrl} demographics={demographics} />
					</div>
				) : route === 'register' ? (
					<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				) : (
					<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;
