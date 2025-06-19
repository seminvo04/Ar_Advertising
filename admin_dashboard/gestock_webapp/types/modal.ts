import { z } from "zod";

export type FieldType = 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea' | 'date'| 'multiselect'| 'file';

export interface FormFieldT {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[];
  validation?: z.ZodType<string | number | boolean | null>;
}

export interface ModalFormProps<T> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FormFieldT[];
  onSubmit: (data: T) => Promise<void>;
  initialData?: T;
  submitText?: string;
}