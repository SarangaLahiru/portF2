// pages/profile.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  // If no user is found, redirect to the home page
  useEffect(() => {
    if (!user) router.push("/");
  }, [user]);

  if (!user) return null; // Show nothing if no user

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt={user.displayName} />
    </div>
  );
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
