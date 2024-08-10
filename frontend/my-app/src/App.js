// src/App.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import ArtistList from './components/articleList/articleList.js';
import Player from './components/player/player.js';
import ExampleComponent from './components/example/exampleComponent.js';
function App() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <ArtistList />
      <Player />
      <ExampleComponent />
    </Provider>
  );
}

export default App;
