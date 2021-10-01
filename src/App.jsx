import './App.css';
import Cities from './Components/Cities/Cities';
import Weather from './Components/Weather/Weather';
import { Provider } from './Context/Context';

function App() {

  const apiKey = '4c100e363be5472a9c1171506211106'

  return (
    <>
      <Provider>
        <Weather api={apiKey} />
        <Cities />
      </Provider>
    </>
  );
}

export default App;
