import Routes from './Routes';
import Navigation from './Navigation';

function App() {

  const hours = 24;
  const now = new Date().getTime();
  const setTime = localStorage.getItem('setTime');

  // store login time and clear localStorage after 24 hours
  if (setTime == null) {
    localStorage.setItem('setTime', now);
  }
  else {
    if (now - setTime > hours * 60 * 60 * 100) {  // 60*60*100 = 1 hour
      localStorage.clear();
      localStorage.setItem('setTime', now);
    }
  }

  return (
    <div className="App">
      <Navigation />
      <Routes />
    </div>
  );
}

export default App;
