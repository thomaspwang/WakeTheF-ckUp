import logo from './logo.svg';
import './App.css';
import {useAtom} from 'jotai'
import {currUserAtom} from "./atoms.js"
import Login from './pages/Login/Login';
import Alarm from './pages/Alarm/Alarm';
import SignUp from './pages/SignUp/SignUp';

function App() {

  const [user] = useAtom(currUserAtom);

  return <SignUp/>
}

export default App;
