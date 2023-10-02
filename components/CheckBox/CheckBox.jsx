import styles from "./CustomCheckbox.module.css";

export default function CustomCheckbox({
  id,
  name,
  label,
  isChecked,
  onToggle,
}) {
  return (
    <label htmlFor={id} className={styles.checkboxContainer}>
      {label}
      <input
        type="checkbox"
        id={id}
        name={name}
        required
        checked={isChecked}
        onChange={onToggle}
      />
      <span className={isChecked ? styles.checkmark : styles.xmark}></span>
    </label>
  );
}
