import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import styles from "./index.module.css";

export const dynamic = "force-dynamic";

export default async function StartPage() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/startpage");
  }

  return (
    <>
      <div className={styles.pageWrapper}>
        <h1 className={styles.headingOne}>Välkommen till Media Watch!</h1>
        <h2 className={styles.headingTwo}>
          Samla dina betaltjänster på ett ställe
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
