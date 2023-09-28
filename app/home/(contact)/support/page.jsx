import { ExitButton } from "@/components/ExitButton/ExitButton";
import Link from "next/link";
import styles from './support.module.css';



export default async function Support() {

  
  return (
    <div className={styles.background}>
    <div className={styles.wrapper}>
    <Link className={styles.exitButton} href="/">
        <ExitButton />
      </Link>
      <h1 className="text-xl">Support</h1>
    </div>
    </div>
  );
}
