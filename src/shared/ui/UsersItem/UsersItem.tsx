import React from "react";
import styles from "./UsersItem.module.css";
import icon from "../../assets/list-icon.svg";
import { useDispatch } from "react-redux";
import { setSelectedUserId } from "../../../app/Store/data/dataSlice";

type UsersItemProps = {
  name: string;
  id: string;
};

const UsersItem: React.FC<UsersItemProps> = ({ name, id }) => {
  const dispatch = useDispatch();
  const handlerClickId = () => {
    dispatch(setSelectedUserId(id));
  };

  return (
    <div className={styles["users-item"]} onClick={handlerClickId}>
      <img
        className={styles["users-item__avatar"]}
        alt="иконка пользователя"
        src={icon}
      />
      <p className={styles["users-item__name"]}>{name}</p>
    </div>
  );
};

export default UsersItem;
