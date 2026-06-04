import "./careers.css";

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="careers-page">{children}</div>;
}
