import Link from "next/link";
import Messages from "./messages";
import styles from "./verify.module.css";
import { NavDots } from "../../../components/NavDots/NavDots";

export default async function VerifyAccount() {
  return (
    <>
      <NavDots
        redirectBack="/create-account"
        imageUrl1="/images/navigation/nav_dot_active.svg"
        imageUrl2="/images/navigation/nav_dot_active.svg"
        imageUrl3="/images/navigation/nav_dot_active.svg"
        imageUrl4="/images/navigation/nav_dot.svg"
      />
      <div className={styles.pageWrapper}>
        <h1 className={styles.headingOne}>Verifiera dig</h1>
        <form
          className={styles.form}
          action="/route-handler/verify"
          method="post"
        >
          <label htmlFor="firstname">Förnamn*</label>
          <input
            className={styles.input}
            name="firstname"
            id="firstname"
            type="text"
            placeholder="Skriv in ditt förnamn"
            required
          />
          <label htmlFor="lastname">Efternamn*</label>
          <input
            className={styles.input}
            name="lastname"
            id="lastname"
            type="text"
            placeholder="Skriv in ditt efternamn"
            required
          />
          <div className={styles.checkboxContainer}>
            <label htmlFor="captcha" className={styles.label}>
              <input type="checkbox" id="captcha" name="captcha" required />
              <span className={styles.checkmark}></span>
              Jag är ingen robot
            </label>
          </div>

          <div className={styles.checkboxContainer}>
            <label htmlFor="conditions" className={styles.label}>
              <input
                type="checkbox"
                id="conditions"
                name="conditions"
                required
              />
              <span className={styles.checkmark}></span>
              <Link className="underline " href="/conditions">
                Användarvillkor
              </Link>
            </label>
          </div>
          <button formAction="/route-handler/verify" className={styles.verify}>
            Kom igång
          </button>
          <Messages />
        </form>
      </div>
    </>
  );
}
