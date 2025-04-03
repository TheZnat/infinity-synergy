import React, { useEffect } from "react";
import styles from "./ListUsers.module.css";

import UsersItem from "../../shared/ui/UsersItem/UsersItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/Store/store";
import { fetchEmployees } from "../../app/entities/employee/model/thunks";
import { Status } from "../../shared/types/status";
import { AppDispatch } from "../../app/Store/store";
// сделать линивую загрузку через обсервер
const ListUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (loading === Status.LOADING) {
    return <div>Загрузка...</div>;
  }

  return (
    <section className={styles["list-users"]}>
      {data.length !== 0 ? (
        data.map((item) => (
          <UsersItem name={item.name} key={item.id} id={item.id} />
        ))
      ) : (
        <div>
          <h1>Нет данных</h1>
        </div>
      )}
    </section>
  );
};

export default ListUsers;
