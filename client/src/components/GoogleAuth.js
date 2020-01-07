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
                    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                });
        });
    }

    // Helper
    renderAuthbutton() {
        if (this.state.isSignedIn === null) {
            return <div>Am I signed in?</div>;
        } else if (this.state.isSignedIn) {
            return <div>I am signed in!</div>;
        } else {
            return <div>I am not currently signed in.</div>;
        }
    }

    render() {
        return <div>{this.renderAuthbutton()}</div>;
    }
}

export default GoogleAuth;
