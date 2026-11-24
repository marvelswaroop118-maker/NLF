import { useId } from 'react';
export default function FormField({
  name,
  label,
  value,
  onChange,
  error,
  full = false,
  children,
  multiline = false,
  ...props
}) {
  const id = useId();
  const shared = {
    id,
    name,
    value,
    onChange: (event) => onChange(name, event.target.value),
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
    ...props,
  };
  return (
    <div className={`fld ${full ? 'full' : ''} ${error ? 'err' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children ? (
        <select {...shared}>{children}</select>
      ) : multiline ? (
        <textarea {...shared} />
      ) : (
        <input {...shared} />
      )}
      {error && (
        <span className="m" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
