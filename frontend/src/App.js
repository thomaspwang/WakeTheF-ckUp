import logo from './logo.svg';
import './App.css';
import {useAtom} from 'jotai'
import {currUserAtom} from "./atoms.js"
import Login from './pages/Login/Login';
import Alarm from './pages/Alarm/Alarm';
import Search from './components/SearchBar/Search';

function App() {

  const [user] = useAtom(currUserAtom);

  return <Search/>
}

export default App;
