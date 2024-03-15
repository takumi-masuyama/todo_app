import { DatePickerValue } from "@tremor/react";
import { Timestamp } from "firebase/firestore";

export type Todo = {
  id: string;
  todo: string;
  isDone: boolean;
  created_at: Timestamp;
  deadLine?: Timestamp;
};
