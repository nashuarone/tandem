import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {

  let surname = props.profileData.surname
  let myname = props.profileData.myname
  let email = props.profileData.email;

  let newName = React.createRef();

  let updateNameUI = () => {
    props.addProfileData();
    //props.dispatch(addPostActionCreator());
  };

  let newNameUI = (e) => {
    let postNameUI = e.target.value;
    //props.updateNewPostText(postMessageUI);
    props.updateProfileData(postNameUI);
  };

  return (
    <div>
      <h3>Мой профиль</h3>
      <div className={s.profileItem}>
        <div className={s.profileItemHalf}>
          <div className={s.boldValue}>Имя</div>
          <div className={s.postBlock}>{myname}</div>
          <i className="fas fa-pencil-alt"></i>
        </div>
        <div className={s.profileItemHalf}>
          <div>
            <input
              placeholder="Введите имя..."
              onChange={newNameUI}
              ref={newName}
              value={props.newNameText}
            ></input>
          </div>
          <div>
            <button onClick={updateNameUI}>Поменять имя</button>
          </div>
        </div>
      </div>
      <div className={s.profileItem}>
        <div className={s.profileItemHalf}>
          <div className={s.boldValue}>Фамилия</div>
          <div className={s.postBlock}>{surname}</div>
        </div>
      </div>
      <div className={s.profileItem}>
        <div className={s.profileItemHalf}>
          <div className={s.boldValue}>e-mail</div>
          <div className={s.postBlock}>{email}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
