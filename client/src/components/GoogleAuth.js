import React from "react";

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "927229141218-646ovgd928nr41ehsk23kc5ek7bbkj6g.apps.googleusercontent.com",
                    scope: "email"
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.setState({ isSignedIn: this.auth.isSignedIn.get() }); // Could just use onAuthChange
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    // Helper
    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    OnSignOutClick = () => {
        this.auth.signOut();
    };

    // Helper
    renderAuthbutton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button
                    onClick={this.OnSignOutClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthbutton()}</div>;
    }
}

export default GoogleAuth;
