import logo from "./logo.svg";
import "./App.css";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App({ signOut, user }) {
    console.log(user);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {user ? (
                    <>
                        <h3>私は権限を持っています: {user.username}</h3>
                        <h3>{user.userId}</h3>
                        <h3>{user.attributes}</h3>
                        <button onClick={signOut}>サインアウト</button>
                    </>
                ) : (
                    <h3>権限を持っていません</h3>
                )}
            </header>
        </div>
    );
}

export default withAuthenticator(App);
