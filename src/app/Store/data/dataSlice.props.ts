import { Status, Employee } from "../../../shared/types";

export default interface ICDataSlice {
  data: Employee[];
  loading: Status;
  selectedUserId: string | null;
  totalCount: number;
}
