export default function Section({
  children,
  className = "",
  as: Component = "section",
  id,
}) {
  return (
    <Component id={id} className={`py-10 sm:py-14 ${className}`}>
      {children}
    </Component>
  );
}