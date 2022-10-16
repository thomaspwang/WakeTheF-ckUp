import logo from './logo.svg';
import './App.css';
import {useAtom} from 'jotai'
import {currUserAtom} from "./atoms.js"
import Login from './pages/Login/Login';
import Alarm from './pages/Alarm/Alarm';
import SignUp from './pages/SignUp/SignUp';
import FriendSearch from './components/FriendSearch/FriendSearch'
import FriendsDropdown from './components/FriendsDropdown/FriendsDropdown';
import Friends from './pages/Friends/Friends';

function App() {

  const [user] = useAtom(currUserAtom);

  return <Alarm/>
}

export default App;
