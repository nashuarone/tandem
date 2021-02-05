import React from 'react'
import s from "./Courses.module.css";

const Courses = (props) => {
  debugger
  return (
    <div>
      <div>Куча курсов</div>
      <div>
        {props.coursesData.map((c) => (
          <div className={s.courseItem} key={c.id}>
            <div className={s.coursePicture}>
              <img src={c.courseImg} />
            </div>
            <div className={s.descriptionItem}>
              <span className={s.tittleDecor}>{c.tittle}</span>
              <div className={s.courseDescription}>{c.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;