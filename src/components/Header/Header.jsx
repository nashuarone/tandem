import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { logout } from '../../redux/profileReducer';
import s from "./Header.module.css";

const Header = () => {
  const isAuth = useSelector(s => s.profilePage.isAuth)
  const dispatch = useDispatch()
  return (
    <div className={s.header}>
      <div className={s.header1}>
        <header>
          <img
            src="https://pngimage.net/wp-content/uploads/2018/06/flowers-logo-png-6.png"
            alt="default-logo"
          />
        </header>
        <div className={s.header2}>Tandem</div>
        <div className={s.loginBlock}>
          {!isAuth && <NavLink to={"/registration"}>Registration</NavLink>}
          {!isAuth && <NavLink to={"/login"}>Login</NavLink>}
          {isAuth && (
            <div className={s.closeDiv} onClick={() => dispatch(logout())}>
              Выход
            </div>
          )}
          {/* {props.isAuth ? props.login : <NavLink to={"/login"}>Login</NavLink>} */}
        </div>
      </div>
    </div>
  );
}

export default Header;