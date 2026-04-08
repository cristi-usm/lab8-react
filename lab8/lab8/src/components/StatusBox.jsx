export default function StatusBox({ type = "info", text }) {
  return <div className={`status-box ${type}`}>{text}</div>;
}