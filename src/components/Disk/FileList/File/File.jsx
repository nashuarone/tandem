import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDir, pushToStack } from "../../../../redux/fileReducer";
import st from "../../Disk.module.css";

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((s) => s.files.currentDir);

  function openDirHandler() {
    dispatch(pushToStack(currentDir));
    dispatch(setCurrentDir(file._id));
  }

  return (
    <div
      className={st.file}
      onClick={file.type === "dir" ? () => openDirHandler() : ""}
    >
      <i
        className={
          file.type === "dir"
            ? "far fa-folder-open file__img"
            : "far fa-file file__img"
        }
      ></i>
      <div className={st.file__name}>{file.fileName}</div>
      <div className={st.file__date}>{file.date.slice(0, 10)}</div>
      <div className={st.file__size}>{file.size}</div>
    </div>
  );
};

export default File;
