import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFiles } from "../../api/api";
import FileList from "./FileList/FileList";
//import Popup from "./Popup";
import { setPopupDisplay, setCurrentDir } from "../../redux/fileReducer";
import st from './Disk.module.css'

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((s) => s.files.currentDir);
  const dirStack = useSelector((s) => s.files.dirStack);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  function showPopupHandler() {
    dispatch(setPopupDisplay("flex"));
  }

  function backHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  return (
    <div className={st.disk}>
      <div className={st.disk__btns}>
        <button className={st.disk__back} onClick={() => backHandler()}>
          Назад
        </button>
        <button className={st.disk__create} onClick={() => showPopupHandler()}>
          Создать папку
        </button>
      </div>
      <FileList />
      {/* <Popup /> */}
    </div>
  );
};

export default Disk;
