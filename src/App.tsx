import React from 'react';
import './App.css';
import SettingsMenu from './components/SettingsMenu';
import SideMenu from './components/SideMenu';
import VisualizationCanvas from './components/VisualizationCanvas';

function App() {
  return (
    <div className="App">
      <SideMenu />
      <VisualizationCanvas />
      <SettingsMenu />
    </div>
  );
}

export default App;
