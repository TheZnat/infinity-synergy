import { createAsyncThunk } from "@reduxjs/toolkit";
import { employeeApi } from "../api/employeeApi";
import { Employee } from "../../../../shared/types";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      return await employeeApi.fetchAll(page, limit);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (employeeId: string, { rejectWithValue }) => {
    try {
      await employeeApi.delete(employeeId);
      return employeeId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (
    {
      employeeId,
      updatedData,
    }: { employeeId: string; updatedData: Partial<Employee> },
    { rejectWithValue }
  ) => {
    try {
      return await employeeApi.update(employeeId, updatedData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
