function Header(props) {
  return (
    <header>
      <h1>To Do List</h1>
      {props.isLoggedIn && <h2>Hi, {props.user.username}!</h2>}

    </header>
  );
}

export default Header;
