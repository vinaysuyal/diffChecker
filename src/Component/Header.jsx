import classes from "./Header.module.css";
function Header() {
  return (
    <nav>
      <span className={classes["nav-title"]}>Diff Checker</span>
    </nav>
  );
}

export default Header;
