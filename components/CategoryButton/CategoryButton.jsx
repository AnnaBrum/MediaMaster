import styles from "./CategoryButton.module.css";

export function CategoryButton({ categoryId, category }) {
  const handleClick = () => {
    console.log("klickad");
  };

  return (
    <button
      className={styles.categoryButton}
      key={categoryId}
      onClick={handleClick}
    >
      {}
    </button>
  );
}
