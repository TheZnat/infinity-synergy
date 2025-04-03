import React from "react";
import styles from "./ProfileInfoItem.module.css";

type ProfileInfoItemProps = {
  dataItem: string | undefined;
  label: string;
  name: string; // Добавляем name для работы с формой
};

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({
  dataItem,
  label,
  name,
}) => {
  return (
    <div className={styles["profile-info__item"]}>
      <p className={styles["profile-info__item__text"]}>{label}</p>
      <input
        type="text"
        name={name} // Добавляем name
        defaultValue={dataItem} // Используем defaultValue вместо value
        className={styles["profile-info__item__input"]}
      />
    </div>
  );
};

export default ProfileInfoItem;
