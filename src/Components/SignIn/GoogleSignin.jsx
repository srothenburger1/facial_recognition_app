import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const CLIENT_ID = '612399434984-3bqm9gges27tses3f8vtub8111th9818.apps.googleusercontent.com';

/*
{
  Ca: google id 
  Qt: {
    Ad: user full name,
    DU: user last name,
    DW: user first name,
    ZU: google id,

  },
  accessToken: string,
  googleId: id ,
  profileObj: {
    email,
    familyName,
    givenName,
    googleId,
    imageUrl,
    name
  },
  tc: {
    access_token: same as before,
    expires_at: number, // its hard to say what format this is
    expires_in: number,
    first_issued_at: number, // also hard to determine
    id_token: really long string,
    idpId: google,
    login_hint: hashed mess,
    scope: looks like a list of links for user info,
    session_state: {
      extraQueryParams: {
        authUser: number
      },
      token_type: "Bearer"
    }
    tokenId: really long string
  },
  tokenObj: {
    access_token: same as before,
    expires_at: number, // its hard to say what format this is
    expires_in: number,
    first_issued_at: number, // also hard to determine
    id_token: really long string,
    idpId: google,
    login_hint: hashed mess,
    scope: looks like a list of links for user info,
    session_state: {
      extraQueryParams: {
        authUser: number
      },
      token_type: "Bearer"
    }
    tokenId: really long string
  }, 
}
*/


class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login (response) {
    if(response.tc.access_token){
      this.setState(state => ({
        isLoggedIn: true,
        accessToken: response.tc.access_token
      }));
    }
    console.log(response)
  }

  logout (response) {
    this.setState(state => ({
      isLoggedIn: false,
      accessToken: ''
    }));
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLogined ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }
      { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null }

    </div>
    )
  }
}

export default GoogleBtn;