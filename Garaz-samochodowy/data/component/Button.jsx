export default function Button({
  children,
  onClick,
  variant = "default",
  type = "button",
  disabled = false,
  ariaLabel,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant}`}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}