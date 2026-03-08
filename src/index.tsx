import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { getEnvConfig, loadEnvConfig } from "./EnvConfig";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

loadEnvConfig().then(() => {
    const config = getEnvConfig();
    Amplify.configure({
        Auth: {
            Cognito: {
                userPoolId: config.cognitoUserPoolId,
                userPoolClientId: config.cognitoUserPoolClientId,
                loginWith: {
                    oauth: {
                        domain: config.cognitoDomain,
                        redirectSignIn: [window.location.origin, `${window.location.origin}/oauth/callback`],
                        redirectSignOut: [window.location.origin],
                        responseType: "code",
                        scopes: ["email", "openid", "profile"],
                    },
                },
            },
        },
    });

    const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
});
