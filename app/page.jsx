import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import styles from "./index.module.css";
import { Logo } from "../components/Logo/Logo";

export const dynamic = "force-dynamic";

export default async function StartPage() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/home");
  }

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <h1 className={styles.headingOne}>Välkommen till <br/> Media Watch!</h1>
        <h2 className={styles.headingTwo}>
          Samla dina betaltjänster <br/> på ett ställe
        </h2>
        <nav className={styles.nav}>
          <Link className={styles.button} href="/about">
            Hur fungerar det?
          </Link>
          <Link className={styles.button} href="/conditions">
            Villkor
          </Link>
          <Link className={styles.button} href="/create-account">
            Skapa konto
          </Link>
          <div className={styles.login}></div>
          <p className={styles.loginText}>
            Har du redan ett konto?
            <Link href="/login">&#8205; Logga in här</Link>
          </p>
        </nav>
      </div>
    </>
  );
}
