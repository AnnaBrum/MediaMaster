import styles from "./LogoutButton.module.css";

export function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className={styles.logout}>
        Logga ut
      </button>
    </form>
  );
}
