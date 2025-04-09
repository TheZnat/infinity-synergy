import React from "react";
import styles from "./ProfileInfoItem.module.css";

type ProfileInfoItemProps = {
  dataItem: string | undefined;
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({
  dataItem,
  label,
  name,
  onChange,
}) => {
  return (
    <div className={styles["profile-info__item"]}>
      <p className={styles["profile-info__item__text"]}>{label}</p>
      <input
        type="text"
        name={name}
        value={dataItem}
        className={styles["profile-info__item__input"]}
        onChange={onChange}
      />
    </div>
  );
};

export default ProfileInfoItem;
