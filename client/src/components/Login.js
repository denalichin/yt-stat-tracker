import { useEffect, useState, useContext} from 'react';
import { jwtDecode } from "jwt-decode";
import { LoginContext } from '../contexts/LoginContext';

export default function Login() {

    const google = window.google;
    // VVV below comment prevents lintor from marking google as undefined? (Might be deprecated) (it's defined in index.html
    /*global google*/ 
    const {user, setUser} = useContext(LoginContext) //declared in App.js. Here we extract it using Context.api

    function handleCallbackResponse(response){
        console.log("Signin Success, Encoded JWT ID token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log("User Object: ");
        console.log(userObject);

        setUser(userObject);

        document.getElementById("signInDiv").hidden = true;
    }

    function handleSignOut(event){
        setUser({}); //set user to empty object, effectively signing out
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(()=> {
        google.accounts.id.initialize({
        client_id: "226902442258-hbu4p3v9q6gkhtnkpdbj8522uo4fr1l1.apps.googleusercontent.com",
        callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large"}
        );

    }, []); //if anything in array is modified, it reloads the page

    return (
        <div>
            <div id="signInDiv"></div>
        </div>
    )
}