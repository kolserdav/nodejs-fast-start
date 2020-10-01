import React from 'react';
import './scss/App.scss';
import Worker from './lib/worker';

const w = new Worker();

function App() {
  const userRes = w.request('http://localhost:3030/u/32', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'userlang': 'ru',
      'test': '3'
    }
  });
  userRes.then(data => {
    console.log(23, data)
  })
  return (
    <div className="App">

    </div>
  );
}

export default App;
