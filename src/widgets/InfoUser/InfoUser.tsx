import styles from "./InfoUser.module.css";
import DefaultAvatar from "../../shared/assets/profile-icon.svg";
import { AppDispatch, RootState } from "../../app/Store/store";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../Feature";
import { useEffect, useState } from "react";
import { updateEmployee } from "../../app/entities/employee/model/thunks";
import { useActionState } from "react";

const InfoUser = () => {
  const { data, selectedUserId } = useSelector(
    (state: RootState) => state.data
  );
  const dispatch = useDispatch<AppDispatch>();
  const [showSuccess, setShowSuccess] = useState(false);

  const dataUser = data.find((user) => user.id === selectedUserId);

  const [dataForm, setDataForm] = useState({
    name: "",
    department: "",
    company: "",
    jobTitle: "",
  });

  useEffect(() => {
    if (dataUser) {
      setDataForm({
        name: dataUser.name || "",
        department: dataUser.department || "",
        company: dataUser.company || "",
        jobTitle: dataUser.jobTitle || "",
      });
    }
  }, [JSON.stringify(dataUser)]);

  const handleFormAction = async () => {
    const updatedData = {
      name: dataForm.name,
      jobTitle: dataForm.jobTitle,
      department: dataForm.department,
      company: dataForm.company,
    };

    if (selectedUserId) {
      await dispatch(
        updateEmployee({ employeeId: selectedUserId, updatedData })
      );
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);

    return { success: true };
  };

  const [_, formAction] = useActionState(handleFormAction, { success: false });

  if (!selectedUserId) {
    return (
      <div className={styles["info-user__plug"]}>Выберите пользователя</div>
    );
  }

  return (
    <section className={styles["info-user"]}>
      <form
        className={styles["info-user__form"]}
        onSubmit={(e) => {
          e.preventDefault();
          formAction();
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="ФИО"
          value={dataForm.name}
          onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
          className={styles["info-user__form__input-name"]}
        />
        <div className={styles["info-user__form__profile"]}>
          <img
            alt="аватарка профиля"
            className={styles["info-user__form__profile__avatar"]}
            src={DefaultAvatar}
          />
          <div className={styles["info-user__form__profile__info"]}>
            <Input
              label="Должность"
              name="jobTitle"
              dataItem={dataForm.jobTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDataForm({ ...dataForm, jobTitle: e.target.value })
              }
            />
            <Input
              label="Отдел"
              name="department"
              dataItem={dataForm.department}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDataForm({ ...dataForm, department: e.target.value })
              }
            />
            <Input
              label="Компания"
              name="company"
              dataItem={dataForm.company}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDataForm({ ...dataForm, company: e.target.value })
              }
            />
          </div>
        </div>
        <button className={styles["info-user__form__button"]} type="submit">
          Сохранить
        </button>
      </form>

      {showSuccess && (
        <p className={styles["info-user__success-message"]}>Данные обновлены</p>
      )}
    </section>
  );
};

export default InfoUser;
