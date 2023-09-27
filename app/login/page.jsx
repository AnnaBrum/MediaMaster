// 'use client';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import Messages from "./messages";
import Link from "next/link";
import { cookies } from "next/headers";
import styles from "./login.module.css";

export const dynamic = "force-dynamic";

export default async function Login() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/startpage");
  }

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.headingOne}>Logga in</h1>
      <form
        className={styles.form}
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          Email*
        </label>
        <input
          className={styles.input}
          name="email"
          id="email"
          autoComplete="email"
          placeholder="Skriv din mail här"
          required
        />
        <label className="text-md" htmlFor="password">
          Lösenord*
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          placeholder="Skriv in ditt lösenord här"
          required
        />
        <button className={styles.login}>
          Logga in
        </button>
        <Link className={styles.reset} href="/reset-password">
          Återställ lösenord
        </Link>
        <Messages />
      </form>
    </div>
  );
}
