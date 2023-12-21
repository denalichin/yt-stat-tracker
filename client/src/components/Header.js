import { useEffect, useState, useContext} from 'react';
import { LoginContext } from '../contexts/LoginContext';

export default function Header(){

    const {user, setUser} = useContext(LoginContext) //declared in App.js. Here we extract it using Context.api

    function handleSignOut(event){
        setUser({}); //set user to empty object, effectively signing out
    }

    return(
        <div>
            <h1>Header</h1>
            <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
        </div>
        
    );
}