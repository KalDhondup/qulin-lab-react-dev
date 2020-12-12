import React from 'react';
// import logo from './../assets/icons/logo.svg';
import './App.css';
import ScrollableTabs from './ScrollableTabs/ScrollableTabs';
import Content from './Content/Content';

function App() {
  const [selectedTab, setSelectedTab] = React.useState('Tab1');

  return (
    <div className="App">
      <div className={'heading'}>
        Demo Container
      </div>

      <>
        <ScrollableTabs selectedTab={(tabName) => setSelectedTab(tabName)} defaultTabCounts={3} maxTabCounts={10} defaultTabWidth={300} defaultStyle={{ height: 36, backgroundColor: '#f6f6f6' }} >
        </ScrollableTabs>
        <Content tabName={selectedTab} />
      </>
    </div>
  );
}


export default App;
