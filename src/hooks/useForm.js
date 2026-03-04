import { useState, useCallback } from 'react';

/**
 * useForm
 * Manages form state, validation, and submission with minimal boilerplate.
 *
 * @param {object} initialValues - initial field values
 * @param {Function} [validate] - optional validation fn returning an errors object
 * @returns {{ values, errors, touched, handleChange, handleBlur, handleSubmit, reset, isSubmitting }}
 *
 * @example
 * const { values, errors, handleChange, handleSubmit } = useForm(
 *   { email: '', password: '' },
 *   (vals) => {
 *     const errs = {};
 *     if (!vals.email.includes('@')) errs.email = 'Invalid email';
 *     return errs;
 *   }
 * );
 */
export function useForm(initialValues = {}, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      if (validate) {
        setErrors(validate(values));
      }
    },
    [validate, values]
  );

  const handleSubmit = useCallback(
    (onSubmit) => async (e) => {
      e?.preventDefault();
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);

      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [validate, values]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return { values, errors, touched, handleChange, handleBlur, handleSubmit, reset, isSubmitting };
}
