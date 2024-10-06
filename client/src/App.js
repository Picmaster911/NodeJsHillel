
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoreDetails from './pages/MoreDetails';
import MainPage from './pages/MainPage';
import TrendsPage from './pages/TrendsPage';
import DrawerAppBar from './components/DrawerAppBar';
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/LoginPage';
import { Provider } from 'react-redux';
import store from './store';



function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <DrawerAppBar />
          <Routes>
            <Route exact path='/' element={<MainPage />} />
            <Route path='/about/' element={<AboutUs />} />
            <Route path='/trends/*' element={< TrendsPage />} />
            <Route path='/details/*' element={< MoreDetails />} />
            <Route path='/login' element={< LoginPage />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
