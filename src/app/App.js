import React from 'react';
import './App.css';
import LogIn from "../intro/logIn/LogIn";
import Register from "../intro/register/Register";
import NavBar from "../firstPage/navigation/NavBar";
import Logo from "../firstPage/logo/Logo";
import Rank from "../firstPage/rank/Rank";
import ImageLinkInput from "../firstPage/imageLink/ImageLinkInput";
import FaceRecognition from "../firstPage/faceRecognition/FaceRecognition";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particlesParams = {
    particles: {
        line_linked: {
            shadow: {enable: true, color: "#3CA9D1", blur: 5}
            },
        number: {
            value: 50,
            density: { enable: true, value_area: 500 }
        }
    }
}

const app = new Clarifai.App({
    apiKey: 'afc123743447454d8021a3328f32c3b8'
});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'logIn',
            isLoggedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                password: '',
                entries: 0,
                joinDate: ''
            }
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:3001');
        const data = await response.json();
        console.log(data);
    }

    routeChange = (route) => {
        this.logInChecker(route);
        this.setState({route: route});
    }

    logInChecker = (route) => {
        if (route === 'home') {
            this.setState({isLoggedIn: true});
        }
        else if (route === 'logOut') {
            this.setState({isLoggedIn: false});
        }
    }

    loadUser = (inputUser) => {
        this.setState({ user: {
                id: inputUser.id,
                name: inputUser.name,
                email: inputUser.email,
                entries: inputUser.entries,
                joinDate: inputUser.joinDate
            }})
    }

    inputListener = (event) => {
       this.setState({input: event.target.value});
    }

    detectListener = async () => {
        try {
            this.setState({imageUrl: this.state.input});
            const response = await app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input);
            if (response) {
                const response = await fetch('http://localhost:3001/image', {
                    method: 'put',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                const entries = await response.json();
                this.setState(Object.assign(this.state.user, {entries: entries}));
            }
            await this.displayFaceBox(this.setBoundingBox(response));
        } catch (error) {
            console.log('There has been some problem with the AI', error);
        }
    }

    setBoundingBox = (data) => {
        const figuredFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return (
            {
                topRow: figuredFace.top_row * height,
                leftCol: figuredFace.left_col * width,
                bottomRow: height - (figuredFace.bottom_row * height),
                rightCol: width - (figuredFace.right_col * width)
            }
        )
    }

    displayFaceBox = (figuredBox) => {
        this.setState({box: figuredBox});
    }

    render()
    {
        const { isLoggedIn , route , imageUrl , box , user} = this.state;
        const { routeChange , inputListener , detectListener , loadUser } = this;

        return (
            <div className="App">
                <NavBar routeChange={routeChange} isLoggedIn={isLoggedIn} />
                { route === 'home'
                    ? <div>
                    <Logo />
                    <Rank name={user.name} entries={user.entries}/>
                    <ImageLinkInput inputListener={inputListener} detectListener={detectListener} />
                    <FaceRecognition imageUrl={imageUrl} box={box} />
                    </div>
                    :(
                        route === 'register'
                        ? <Register routeChange={routeChange} loadUser={loadUser}/>
                        : <LogIn routeChange={routeChange} loadUser={loadUser} />
                    )
                }
                <Particles className='particles' params={particlesParams} />
            </div>
        );
    }
}

export default App;
