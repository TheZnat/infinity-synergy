"use client";

import styles from "./InfoUser.module.css";
import DefaultAvatar from "../../shared/assets/profile-icon.svg";
import { AppDispatch, RootState } from "../../app/Store/store";
import { useSelector } from "react-redux";
import ProfileInfoItem from "../../shared/ui/ProfileInfoItem/ProfileInfoItem";
import { useRef, useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateEmployee } from "../../app/entities/employee/model/thunks";

const updateEmployeeAction = async (prevState: any, formData: FormData) => {
  "use server";
  const employeeId = formData.get("employeeId") as string;
  const updatedData = {
    name: formData.get("name") as string,
    department: formData.get("department") as string,
    company: formData.get("company") as string,
    jobTitle: formData.get("jobTitle") as string,
  };

  if (!employeeId) return { error: "Не выбран сотрудник" };

  // Симуляция обновления через Redux
  const dispatch: AppDispatch = (await import("../../app/Store/store")).store
    .dispatch;
  dispatch(updateEmployee({ employeeId, updatedData }));

  return { success: "Данные обновлены!" };
};

const InfoUser = () => {
  const { data, selectedUserId } = useSelector(
    (state: RootState) => state.data
  );

  const formRef = useRef<HTMLFormElement>(null);
  const dataUser = data.find((user) => user.id === selectedUserId);
  const [formState, formAction] = useFormState(updateEmployeeAction, null);

  // Добавляем состояние для отображения успешного сообщения
  const [isSuccessVisible, setSuccessVisible] = useState(false);

  useEffect(() => {
    if (formState?.success) {
      setSuccessVisible(true);
      const timer = setTimeout(() => {
        setSuccessVisible(false);
      }, 3000);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании
    }
  }, [formState?.success]);

  if (!selectedUserId) {
    return (
      <div className={styles["info-user__plug"]}>Выберите пользователя</div>
    );
  }

  return (
    <section className={styles["info-user"]}>
      <form
        ref={formRef}
        className={styles["info-user__form"]}
        action={formAction}
      >
        <input type="hidden" name="employeeId" value={selectedUserId} />
        <input
          type="text"
          name="name"
          placeholder="ФИО"
          defaultValue={dataUser?.name || ""}
          className={styles["info-user__form__input-name"]}
        />
        <div className={styles["info-user__form__profile"]}>
          <img
            alt="аватарка профиля"
            className={styles["info-user__form__profile__avatar"]}
            src={DefaultAvatar}
          />
          <div className={styles["info-user__form__profile__info"]}>
            <ProfileInfoItem
              label="Должность"
              name="jobTitle"
              dataItem={dataUser?.jobTitle || ""}
            />
            <ProfileInfoItem
              label="Отдел"
              name="department"
              dataItem={dataUser?.department || ""}
            />
            <ProfileInfoItem
              label="Компания"
              name="company"
              dataItem={dataUser?.company || ""}
            />
          </div>
        </div>
        <SubmitButton />
        {formState?.error && <p className="error">{formState.error}</p>}

        {isSuccessVisible && <p className="success">{formState.success}</p>}
      </form>
    </section>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className={styles["info-user__form__button"]}
      type="submit"
      disabled={pending}
    >
      {pending ? "Сохранение..." : "Сохранить"}
    </button>
  );
};

export default InfoUser;
