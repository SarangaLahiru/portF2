import { useRouter } from "next/router";
import { useEffect } from "react";

import Layout from "../components/Layout";
import { SidebarDemo } from "../components/ProfileComponents/side";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if no user and not loading
  useEffect(() => {
    if (user === null) {
      router.push("/"); // Redirect to home if not authenticated
    }
  }, [user, router]);

  // Show loading state or nothing until user is loaded
  if (user === undefined) return <p>Loading...</p>; // or any other loading indicator

  if (!user) return null; // Redirected by this point

  return (
    // <div>
    //   <h1>Profile</h1>
    //   <p>Name: {user.displayName}</p>
    //   <p>Email: {user.email}</p>
    //   {user.photoURL && <img src={user.photoURL} alt={user.displayName} />}
    //   <button onClick={logout}>Logout</button>
      
    // </div>
    <SidebarDemo/>
  );
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
