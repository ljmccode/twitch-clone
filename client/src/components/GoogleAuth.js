import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'

class GoogleAuth extends Component {
    componentDidMount() {
        // loads up client portion of the library
        // goes to google servers and load in additional code
        window.gapi.load('client:auth2', () => {
            // initialize library with client id
            window.gapi.client.init({
                clientId: '350843457155-fkfmdtegqddcfqisjnaa7lttl1ud42kc.apps.googleusercontent.com',
                // what part of the user account do you want access to
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // use google api to find out if signed in and pass it into onAuthChange to update state
                this.onAuthChange(this.auth.isSignedIn.get())
                // the arguement passed into listen should be a function that takes a boolean value
                // listen passes true to this funciton when user signs in and false when signs out
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    // will be called anytime out auth status changes according to the google API
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    };
 
    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        // will be null if just rendered to the screen
        if (this.props.isSignedIn === null) {
            return;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In
                </button>
            )
        }
    }

    render() {
        return(
            <div>{this.renderAuthButton()}</div>
        )
    };
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);