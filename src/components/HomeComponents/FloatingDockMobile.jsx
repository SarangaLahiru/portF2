// components/NavBar2.js
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandPushover,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { useAuth } from "../../context/AuthContext";

export default function NavBar2() {
  const { user, login, logout } = useAuth();

  console.log(user)

  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-300" />,
      href: "/",
    },
    {
      title: "Contact",
      icon: <IconTerminal2 className="h-full w-full text-neutral-300" />,
      href: "/contact",
    },
    {
      title: "Components",
      icon: <IconNewSection className="h-full w-full text-neutral-300" />,
      href: "/profile",
    },
    {
      title: "Changelog",
      icon: <IconExchange className="h-full w-full text-neutral-300" />,
      href: "#",
    },
    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full text-neutral-300" />,
      href: "#",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-300" />,
      href: "#",
    },
    {
      title: user ? "Profile" : "Login", // Update title based on login state
      icon: user ? (
        <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full" />
      ) : (
        <IconBrandPushover className="h-full w-full text-neutral-300" />
      ),
      href: user ? "/profile" : "#", // Set href to profile if user is logged in
      // Add onClick for login if user is not logged in
    },
    
  ];

  return (
    <div className="fixed top-[55px] w-full z-20 px-6 flex flex-col items-center">
      {/* Navbar with links */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center m-auto">
          <div className="absolute m-auto w-[35%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
          <FloatingDock mobileClassName="translate-y-0" items={links} />
        </div>
        <div className="flex items-center relative lg:left-[-300px] items-center mt-0  ">
        {user ? (
          <button
            onClick={logout}
            className="text-white bg-black px-4 py-2 rounded-full hover:bg-black"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={login}
            className="text-white bg-black px-4 py-2 rounded-full hover:bg-black"
          >
            Login
          </button>
        )}
      </div>
      
    </div>
      </div>

      
  );
}
