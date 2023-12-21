import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';
import { LoginContext } from './contexts/LoginContext';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';

function App() {

  const google = window.google;
   // VVV below comment prevents lintor from marking google as undefined? (Might be deprecated) (it's defined in index.html
   /*global google*/ 
  const [user, setUser] = useState({}) //temporary, don't use this normally, use context API or Redux

  // function handleSignOut(event){
  //   setUser({}); //set user to empty object, effectively signing out
  //   document.getElementById("signInDiv").hidden = false;
  // }

  useEffect(()=> {

  }, []); //if anything in array is modified, it reloads the page
  
  

  return (
    <LoginContext.Provider value={{user, setUser}}> {/* these variables accessible by all sub divs and components */}
      <div className="App">

        {/* <Login /> */}

        {Object.keys(user).length != 0 ? //if user object is not empty, then show dashboard
          <Dashboard/> :  <Login/>
        }

        

        {/* {Object.keys(user).length != 0 && //if user object is not empty, then show signout button (temporary)
          <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
        } */}

        


      </div>
    </LoginContext.Provider>
  );
}

export default App;
