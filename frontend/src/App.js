import logo from './logo.svg';
import './App.css';
import {useAtom} from 'jotai'
import {currUserAtom} from "./atoms.js"
import Login from './pages/Login/Login';
import Alarm from './pages/Alarm/Alarm';

function App() {

  const [user] = useAtom(currUserAtom);

  return <Alarm/>
}

export default App;
