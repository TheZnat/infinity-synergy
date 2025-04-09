import axios from "axios";
import { Employee } from "../../../../shared/types";

const API_URL = import.meta.env.VITE_API_URL;

export const employeeApi = {
  fetchAll: async (page = 1, limit = 40) => {
    const response = await axios.get<Employee[]>(API_URL, {
      params: {
        _page: page,
        _limit: limit,
      },
    });

    const totalCount = parseInt(response.headers["x-total-count"] || "0", 10);

    return {
      data: response.data,
      totalCount,
    };
  },

  delete: async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },

  update: async (id: string, updatedEmployee: Partial<Employee>) => {
    const { data } = await axios.patch<Employee>(
      `${API_URL}/${id}`,
      updatedEmployee
    );
    return data;
  },
};
