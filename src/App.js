import { useEffect } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { useTelegram } from './components/hooks/useTelegram';

function App() {
	const {tg, onToggleButton} = useTelegram()
  useEffect(() => {
		tg.ready();
	}, []) 

	return (
    <div className="App">
			<Header></Header>
			<button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
