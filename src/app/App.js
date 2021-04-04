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

const defaultState = {
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

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = defaultState;
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
            this.setState(defaultState);
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

    detectListener = () => {
        this.setState({imageUrl: this.state.input});
        fetch('http://localhost:3001/imageUrl', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response) {
                fetch('http://localhost:3001/image', {
                    method: 'put',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                .then(response => response.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}));
                })
            }
            this.displayFaceBox(this.setBoundingBox(response));
        })
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
