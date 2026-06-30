export default function Input({
  error,
  id,
  label,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="form-field">
      {label ? (
        <label htmlFor={id}>
          {label}
          {required ? " *" : ""}
        </label>
      ) : null}
      <input
        className={["input", error ? "input--error" : "", className]
          .filter(Boolean)
          .join(" ")}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <span className="form-field__error" id={`${id}-error`}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
