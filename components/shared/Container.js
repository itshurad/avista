export default function Container({ children, className = "", size = "lg" }) {
  const sizes = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    full: "max-w-full",
  };

  return (
    <div className={`mx-auto w-full px-4 sm:px-6 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}