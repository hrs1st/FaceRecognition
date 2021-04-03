import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputName: '',
            inputEmail: '',
            inputPassword: ''
        }
    }

    nameChange = (event) => {
        this.setState({inputName: event.target.value});
    }

    emailChange = (event) => {
        this.setState({inputEmail: event.target.value});
    }

    passwordChange = (event) => {
        this.setState({inputPassword: event.target.value});
    }

    registerSubmit = async () => {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                name: this.state.inputName,
                email: this.state.inputEmail,
                password: this.state.inputPassword
            })
        });
        const user = await response.json();

        if (user) {
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
                                <legend className="f2 fw6 ph0 mh0 white">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">FullName</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                           onChange={this.nameChange}
                                           type="text" name="name" id="name"/>
                                </div>
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
                                <input onClick={this.registerSubmit}
                                       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                       type="submit" value="Register"/>
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => routeChange('logIn')}
                                   className="f6 link dim black db white pointer">Sign in</p>
                            </div>
                        </div>
                    </main>
                </div>
            </article>
        )
    }

}

export default Register;