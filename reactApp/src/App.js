import {useEffect} from 'react';
import { useStateProvider } from './utils/stateProvider';
import {reducerCases} from './utils/constants';
import Login from './pages/Login';
import Homepage from './pages/Homepage';

function App() {
  const [token, dispatch] = useStateProvider()
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      let token = hash.substring(1).split('&')[0].split('=')[1];
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);
  return (
    <div style={styles.container}>
      {token ? <Homepage/> : <Login/>}
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: 'green',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'col',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default App;
