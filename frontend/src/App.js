import logo from './logo.svg';
import './App.css';
import {useAtom} from 'jotai'
import {currUserAtom} from "./atoms.js"
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

function App() {

  const [user] = useAtom(currUserAtom);

  if (user == '') {
    return <Login/>
  } else {
    return <Home/>
  }
  
}

export default App;
