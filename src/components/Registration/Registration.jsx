import React, { useState } from 'react'
import { registrationAPI } from '../../api/api'
import s from "./Registration.module.css"

const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handlleChangeE = (e) => {
    setEmail(e.target.value)
  }
  const handlleChangeP = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={s.mainLoginForm}>
      <h1>Registration</h1>
      <div className={s.inputsFlex}>
        <input
          value={email}
          onChange={handlleChangeE}
          type="text"
          placeholder="Ведите email"
        />
        <input
          value={password}
          onChange={handlleChangeP}
          type="password"
          placeholder="Введите пароль"
        />
        <button className={s.regBtn} onClick={() => registrationAPI(email, password)} >Зарегестрироваться</button>
      </div>
    </div>
  );
}

export default Registration
