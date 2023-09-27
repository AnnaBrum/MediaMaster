import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import Messages from "./messages";
import { cookies } from "next/headers";
import styles from "./register.module.css";
import { NavDots } from "../../../components/NavDots/NavDots";

export const dynamic = "force-dynamic";

export default async function RegisterWithEmail() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/home");
  }

  return (
    <>
      <NavDots
        redirectBack="/create-account"
        imageUrl1="/images/navigation/nav_dot_active.svg"
        imageUrl2="/images/navigation/nav_dot_active.svg"
        imageUrl3="/images/navigation/nav_dot.svg"
        imageUrl4="/images/navigation/nav_dot.svg"
      />
      <div className={styles.pageWrapper}>
        <h1 className={styles.headingOne}>Registrera dig</h1>
        <form className={styles.form} action="/auth/sign-up" method="post">
          <label htmlFor="email">Email*</label>
          <input
            className={styles.input}
            name="email"
            id="email"
            type="email"
            placeholder="you@example.com"
            required
          />
          <label htmlFor="password">Lösenord*</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            required
          />
          <button formAction="/auth/sign-up" className={styles.login}>
            Logga in
          </button>
          <Messages />
        </form>
      </div>
    </>
  );
}
