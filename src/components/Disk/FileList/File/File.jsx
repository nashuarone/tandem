import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadFileAPI } from "../../../../api/api";
import { setCurrentDir, pushToStack } from "../../../../redux/fileReducer";
import st from "../../Disk.module.css";

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((s) => s.files.currentDir);
  function openDirHandler(file) {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  }
  function downloadHandler(e) {
    e.stopPropagation()
    downloadFileAPI(file)
  }

  return (
    <div
      className={st.file}
      onClick={() => openDirHandler(file)}
    >
      <i
        className={
          file.type === "dir"
            ? "far fa-folder-open file__img"
            : "far fa-file file__img"
        }
      ></i>
      <div className={st.file__name}>{file.name}</div>
      {file.type !== "dir" && <button onClick={(e) => downloadHandler(e)} className={st.fileBtn+" "+st.fileDownload}>Скачать</button>}
      <button className={st.fileBtn+" "+st.fileDelete}>Удалить</button>
      <div className={st.file__date}>{file.date.slice(0, 10)}</div>
      {file.type !== "dir" && <div className={st.file__size}>{file.size}</div>}

    </div>
  );
};

export default File;
