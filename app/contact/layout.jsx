import { ExitButton } from "../../components/ExitButton/ExitButton";

export default function ContactLayout({ children }) {
  return (
    <div className="wrapper">
      <div className="exitButton">
        <ExitButton />
      </div>
      {children}
    </div>
  );
}
