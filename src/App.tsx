import React from 'react';
import { useState } from 'react';
import './App.css';
import SettingsMenu from './components/SettingsMenu';
import SideMenu from './components/SideMenu';
import VisualizationCanvas from './components/VisualizationCanvas';

function App() {

  const [data, setData] = useState<d3.DSVParsedArray<object>>();

  const updateData = (data: d3.DSVParsedArray<object>) => {
    setData(data);
  }

  return (
    <div className="App">
      <SideMenu updateData={updateData} />
      <VisualizationCanvas data={data} />
      <SettingsMenu />
    </div>
  );
}

export default App;
