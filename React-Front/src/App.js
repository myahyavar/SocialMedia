import { useSelector} from 'react-redux';
import { selectUser } from './userSlice';
import Nav from './Nav';
import Login from './Login';
function App() {
    const user= useSelector(selectUser);
    return <div>{user ? <Nav/> : <Login/>}</div>;
  };
  
export default App;
  