import Employee from "../../../shared/types/employees";
import { Status } from "../../../shared/types/status";

export default interface ICDataSlice {
  data: Employee[];
  loading: Status;
  selectedUserId: string | null;
}
