// components/Navbar.js
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, login, logout } = useAuth();

  return (
    <nav style={navStyle}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      {user ? (
        <>
          <Link href="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login with Google</button>
      )}
    </nav>
  );
};

const navStyle = {
  display: "flex",
  gap: "20px",
  padding: "10px",
  background: "#f0f0f0",
};

export default Navbar;
