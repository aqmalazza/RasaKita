export default function Button({
  children,
  className = "",
  fullWidth = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}) {
  const classes = [
    "button",
    `button--${variant}`,
    size !== "md" ? `button--${size}` : "",
    fullWidth ? "button--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
