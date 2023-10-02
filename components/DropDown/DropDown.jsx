import styles from "./DropDown.module.css";

const DropDown = ({ submenus, dropdown }) => {
  return (
    <ul
      className={`dropdown ${dropdown ? "show" : ""}`}
      styles={styles.Dropdown}
    >
      {submenus.map((submenu, index) => (
        <li key={index} className="subMenuItems">
          <a href={submenu.url}>{submenu.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default DropDown;
