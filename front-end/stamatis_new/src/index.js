import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// import reportWebVitals from './reportWebVitals';
const userData = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username')
};

ReactDOM.render(
  <React.StrictMode>
    <App userData={userData} />
  </React.StrictMode>,
  document.getElementById('root')
);
