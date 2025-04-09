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
  loading: Status.SUCCESS,
  selectedUserId: null,
  totalCount: 0,
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
    builder.addCase(fetchEmployees.pending, (state) => {
      if (state.loading !== Status.LOADING) {
        state.loading = Status.LOADING;
      }
    });

    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      const newData = action.payload.data.filter(
        (newItem) =>
          !state.data.some((existingItem) => existingItem.id === newItem.id)
      );
      state.data = [...state.data, ...newData];

      if (action.payload.totalCount > 0) {
        state.totalCount = action.payload.totalCount;
      }

      state.loading = Status.SUCCESS;
    });

    builder.addCase(fetchEmployees.rejected, (state) => {
      state.loading = Status.ERROR;
    });

    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.data = state.data.filter((emp) => emp.id !== action.payload);
    });

    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.data = state.data.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp
      );
    });
  },
});

export const { setData, setSelectedUserId } = dataSlice.actions;
export default dataSlice.reducer;
