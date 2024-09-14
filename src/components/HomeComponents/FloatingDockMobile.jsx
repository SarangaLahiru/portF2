// pages/contact.js
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandGithub,
    IconBrandX,
    IconExchange,
    IconHome,
    IconNewSection,
    IconTerminal2,
} from "@tabler/icons-react";


export default function NavBar2() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-300" />
      ),
      href: "#",
    },
 
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full  text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full  text-neutral-300" />
      ),
      href: "#",
    },
    
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full  text-neutral-300" />
      ),
      href: "#",
    },
 
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full  text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-300 " />
      ),
      href: "#",
    },
  ];
  return (
    <div className="flex items-center justify-center w-full fixed z-20 top-[55px]">
      <FloatingDock
        mobileClassName="translate-y-0" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}


