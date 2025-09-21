import { Dispatch, SetStateAction } from "react";

export interface FieldState<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
} 