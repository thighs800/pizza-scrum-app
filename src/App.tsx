import React from 'react';
import './App.css';
import Auth from './components/Auth'; // Authコンポーネントをインポート

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pizza Scrum App</h1>
      </header>
      <Auth /> {/* Authコンポーネントを使用 */ }
    </div>
  );
}

export default App;
