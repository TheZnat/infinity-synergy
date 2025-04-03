import axios from "axios";
import Employee from "../../../../shared/types/employees";

const API_URL = "http://localhost:3001/employees";

export const employeeApi = {
  fetchAll: async () => {
    const { data } = await axios.get<Employee[]>(API_URL);
    return data;
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
