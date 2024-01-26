/*global google*/ 
import { useEffect, useState, useContext} from 'react';
import { jwtDecode } from "jwt-decode";
import { LoginContext } from '../contexts/LoginContext';

export default function Login() {

    // const google = window.google;

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


    //*** These 2 Entire UseEffect is to test Alt way of initializing gsi script
    const [loaded,setLoaded] = useState(false); //tell if google script is loaded
    useEffect(() => {
        console.log("USE EFFECT 1");
        const scriptTag = document.createElement('script');
        scriptTag.src = 'https://accounts.google.com/gsi/client';
        scriptTag.onload = () => setLoaded(true); //wait for gsi script to load before using it
        document.body.appendChild(scriptTag);
    }, []);

    useEffect(()=>{
        console.log("USE EFFECT 2");
        if(!loaded) return;
        console.log('google alt script LOADED');

        google.accounts.id.initialize({
            client_id: "226902442258-hbu4p3v9q6gkhtnkpdbj8522uo4fr1l1.apps.googleusercontent.com",
            callback: handleCallbackResponse
            });
    
            google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large"}
            );
    },[loaded]);

    // Original way to use the google gsi script
    // useEffect(()=> {
        
    //     console.log("useEffect running...");
    //     /* global google */ 

    //     //google not defined can be fixed by removing async and defer in index.html
    //     google.accounts.id.initialize({
    //     client_id: "226902442258-hbu4p3v9q6gkhtnkpdbj8522uo4fr1l1.apps.googleusercontent.com",
    //     callback: handleCallbackResponse
    //     });

    //     google.accounts.id.renderButton(
    //     document.getElementById("signInDiv"),
    //     { theme: "outline", size: "large"}
    //     );

    // }, []); //if anything in array is modified, it reloads the page

    return (
        <div>
            <div id="signInDiv"></div>
        </div>
    )
}