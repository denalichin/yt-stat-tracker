import Header from "../components/Header";
import { useContext} from 'react';
import { LoginContext } from '../contexts/LoginContext';


export default function Dashboard () {

    const {user, setUser} = useContext(LoginContext) //declared in App.js. Here we extract it using Context.api
    
    return (
        <div>
            <Header />
            <h1>Dashboard</h1>
            {user &&
                <div>
                    <img src={user.picture}></img>
                    <h3>{user.name}</h3>
                </div>
            }
        </div>
        
    );
}