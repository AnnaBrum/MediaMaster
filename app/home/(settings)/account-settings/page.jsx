import styles from "./settings.module.css";
import { ExitButton } from "@/components/ExitButton/ExitButton";
import Link from "next/link";

export default async function Settings() {
  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <Link className={styles.exitButton} href="/">
          <ExitButton />
        </Link>
        <h1 className="text-xl">Kontoinställningar</h1>         
      </div>
    </div>
  );
}
