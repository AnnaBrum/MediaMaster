import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Messages from "./messages";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NavDots } from "../../components/NavDots/NavDots";
import styles from "./create-account.module.css";

export const dynamic = "force-dynamic";

export default async function CreateAccount() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    //this is a protected route - only users who are signed in can view this route
    redirect("/startpage");
  }
  return (
    <>
      <NavDots
        redirectBack="/"
        imageUrl1="/images/navigation/nav_dot_active.svg"
        imageUrl2="/images/navigation/nav_dot.svg"
        imageUrl3="/images/navigation/nav_dot.svg"
        imageUrl4="/images/navigation/nav_dot.svg"
      />
      <div className={styles.pageWrapper}>
        <h1 className={styles.headingOne}>Skapa konto</h1>
        <h2 className={styles.headingTwo}>Registrera dig med</h2>
        <Link href="/register-with-google" className={styles.register}>
          Google
        </Link>
        <Link
          href="/create-account/register-with-email"
          className={styles.register}
        >
          Email
        </Link>
        <Messages />
      </div>
    </>
  );
}
