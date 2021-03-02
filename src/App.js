import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import CoursesContainer from "./components/Courses/CoursesContainer";
import Profile from './components/Profile/Profile';
import Registration from './components/Registration/Registration';
import Login from "./components/Registration/Login";
import { useSelector } from 'react-redux';

function App() {
  const isAuth = useSelector((s) => s.profilePage.isAuth);
  return (
    <BrowserRouter>
      <div>
        <div className="app-wrapper">
          <Header />
          <Navbar />
          <div className="app-wrapper-content">
            {!isAuth && (
              <Route path="/registration" render={() => <Registration />} />
            )}
            {!isAuth && <Route path="/login" render={() => <Login />} />}
            <Route path="/profile" render={() => <Profile />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/news" component={News} />
            <Route path="/courses" render={() => <CoursesContainer />} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
