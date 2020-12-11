import logo from './../assets/icons/logo.svg';
import './App.css';
import ScrollableTabs from './ScrollableTabs/ScrollableTabs';

function App() {
  return (
    <div className="App">
      <div>
        Demo Container
      </div>

      <div style={{ width: '80%' }}>
        <ScrollableTabs defaultTabCounts={3} maxTabCounts={10} defaultTabWidth={300} defaultStyle={{ height: 36, backgroundColor: 'gray' }} />
      </div>
    </div>
  );
}

export default App;
