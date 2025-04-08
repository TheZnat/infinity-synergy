import { useEffect, useRef } from "react";
import styles from "./ListUsers.module.css";
import UsersItem from "../../shared/ui/UsersItem/UsersItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/Store/store";
import { fetchEmployees } from "../../app/entities/employee/model/thunks";
import { Status } from "../../shared/types/status";
import { AppDispatch } from "../../app/Store/store";

const LIMIT = 40;

const ListUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, loading, totalCount } = useSelector(
    (state: RootState) => state.data
  );

  const currentPage = Math.ceil(data.length / LIMIT) + 1;
  const isAllLoaded = totalCount > 0 && data.length >= totalCount;
  const canFetchMore = loading !== Status.LOADING && !isAllLoaded;

  useEffect(() => {
    if (data.length === 0 && loading !== Status.LOADING) {
      dispatch(fetchEmployees({ page: 1, limit: LIMIT }));
    }
  }, [dispatch, data.length, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && canFetchMore) {
        dispatch(fetchEmployees({ page: currentPage, limit: LIMIT }));
      }
    });

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [dispatch, currentPage, canFetchMore]);

  return (
    <section className={styles["list-users"]}>
      {data.length > 0 ? (
        data.map((item) => (
          <UsersItem name={item.name} key={item.id} id={item.id} />
        ))
      ) : (
        <div>Пользователи не найдены</div>
      )}

      <div ref={observerRef} style={{ height: "40px", marginTop: "20px" }}>
        {isAllLoaded
          ? "Все данные загружены"
          : loading === Status.LOADING
          ? "Загрузка..."
          : "Прокрутите вниз для загрузки"}
      </div>
    </section>
  );
};

export default ListUsers;
