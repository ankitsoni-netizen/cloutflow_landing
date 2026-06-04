import "./creators.css";

export default function CreatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="creators-page">{children}</div>;
}
