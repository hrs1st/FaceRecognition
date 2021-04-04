import React from 'react';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputEmail: '',
            inputPassword: ''
        }
    }

    emailChange = (event) => {
        this.setState({inputEmail: event.target.value});
    }

    passwordChange = (event) => {
        this.setState({inputPassword: event.target.value});
    }

    logInSubmit = async () => {
        const response = await fetch('http://localhost:3001/logIn', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.inputEmail,
                password: this.state.inputPassword
            })
        });
        const user = await response.json();

        if (user.id) {
            this.props.loadUser(user);
            this.props.routeChange('home');
        }
    }

    render() {
        const {routeChange} = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div>
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0 white">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                           onChange={this.emailChange}
                                           type="email" name="email-address" id="email-address"/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                           onChange={this.passwordChange}
                                           type="password" name="password" id="password"/>
                                </div>
                            </fieldset>
                            <div className="">
                                <input onClick={this.logInSubmit}
                                       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                       type="submit" value="Sign in"/>
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => routeChange('register')}
                                   className="f6 link dim black db white pointer">Register</p>
                            </div>
                        </div>
                    </main>
                </div>
            </article>
        )
    }

}

export default LogIn;