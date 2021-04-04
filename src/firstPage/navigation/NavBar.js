import React from 'react';

const NavBar = ({routeChange , isLoggedIn}) => {
    if (isLoggedIn) {
        return (
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p className={'f3 link dim black underline pa3 pointer'}
                   onClick={() => routeChange('logOut')} > SignOut </p>
            </nav>
        )
    }
    else {
        return (
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p className={'f3 link dim black underline pa3 pointer'}
                   onClick={() => routeChange('logIn')} > SignIn </p>

                <p className={'f3 link dim black underline pa3 pointer'}
                   onClick={() => routeChange('register')} > Register </p>
            </nav>
        )
    }

}

export default NavBar;