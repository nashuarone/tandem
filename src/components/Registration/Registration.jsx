import React, { useState } from 'react'
import { registrationAPI } from '../../api/api'
import s from "./Registration.module.css"

const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [myname, setMyname] = useState("")
  const [surname, setSurname] = useState("");
  const handlleChangeE = (e) => {
    setEmail(e.target.value)
  }
  const handlleChangeP = (e) => {
    setPassword(e.target.value);
  };
  const handlleChangeM = (e) => {
    setMyname(e.target.value);
  };
  const handlleChangeS = (e) => {
    setSurname(e.target.value);
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
        <input
          value={myname}
          onChange={handlleChangeM}
          type="text"
          placeholder="Введите имя"
        />
        <input
          value={surname}
          onChange={handlleChangeS}
          type="text"
          placeholder="Введите фамилию"
        />
        <button
          className={s.regBtn}
          onClick={() => registrationAPI(email, password, myname, surname)}
        >
          Зарегестрироваться
        </button>
      </div>
    </div>
  );
}

export default Registration
