import { createSlice } from "@reduxjs/toolkit";
import ICDataSlice from "./dataSlice.props";
import { Status } from "../../../shared/types/status";
import {
  fetchEmployees,
  deleteEmployee,
  updateEmployee,
} from "../../entities/employee/model/thunks";

const initialState: ICDataSlice = {
  data: [],
  loading: Status.LOADING,
  selectedUserId: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Получение сотрудников
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = Status.LOADING;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = Status.SUCCESS;
    });
    builder.addCase(fetchEmployees.rejected, (state) => {
      state.loading = Status.ERROR;
    });

    // Удаление сотрудника
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.data = state.data.filter((emp) => emp.id !== action.payload);
    });

    // Обновление сотрудника
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.data = state.data.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp
      );
    });
  },
});

export const { setData, setSelectedUserId } = dataSlice.actions;
export default dataSlice.reducer;
