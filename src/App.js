import Routes from './Routes';
import Navigation from './Navigation';

function App() {

  const hours = 24;
  const now = new Date().getTime();
  const setTime = window.localStorage.getItem('setTime');

  // clear localStorage after 24 hours
  if (setTime && now - setTime > hours * 60 * 60 * 100) {  // 60*60*100 = 1 hour
    window.localStorage.clear();
  }

  return (
    <div className="App">
      <Navigation />
      <Routes />
    </div>
  );
}

export default App;
