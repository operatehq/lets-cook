import { useState } from "react";

type UseFormResult<T> = {
  formData: T;
  updateField: (field: keyof T, value: string) => void;
  resetForm: () => void;
  setFormData: (data: T) => void;
};

export function useForm<T extends Record<string, any>>(
  initialData: T,
): UseFormResult<T> {
  const [formData, setFormData] = useState<T>(initialData);

  const updateField = (field: keyof T, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = (): void => {
    setFormData(initialData);
  };

  return {
    formData,
    updateField,
    resetForm,
    setFormData,
  };
}
