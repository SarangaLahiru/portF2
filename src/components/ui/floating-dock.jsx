// components/FloatingDock.js
"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export const FloatingDock = ({ items, desktopClassName }) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
    </>
  );
};

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAutoHovering, setIsAutoHovering] = useState(true);

  useEffect(() => {
    if (!isAutoHovering) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setHoveredIndex(items[currentIndex].title);
      currentIndex++;
      if (currentIndex >= items.length) {
        currentIndex = 0;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [items, isAutoHovering]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={transition}
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
        setIsAutoHovering(false);
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        setIsAutoHovering(true);
      }}
      className={cn(
        "mx-auto max-sm:gap-4 flex h-16 gap-12 items-end rounded-2xl bg-neutral-900 px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          key={item.title}
          mouseX={mouseX}
          title={item.title}
          icon={item.icon}
          href={item.href}
          onClick={item.onClick}
          active={router.pathname === item.href}
          isHovered={hoveredIndex === item.title}
          setHoveredIndex={setHoveredIndex}
          avatar={item.avatar}
          isButton={item.isButton}
        />
      ))}
    </motion.div>
  );
};


const IconContainer = ({
  mouseX,
  title,
  icon,
  href,
  onClick,
  active,
  isHovered,
  setHoveredIndex,
  avatar,
  isButton,
  avatarSize = 35
}) => {
  const ref = useRef(null);
  const router = useRouter();

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href); // Use router.push for internal navigation
    }
  };

  const iconElement = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHoveredIndex(title)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`aspect-square rounded-full flex items-center justify-center relative ${active ? 'bg-white' : 'bg-neutral-800'}`}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            className="px-2 py-0.5 whitespace-pre rounded-md border bg-neutral-800 border-neutral-900 text-white absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
        onClick={handleClick}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={title}
            className="rounded-full"
            style={{ width: avatarSize, height: avatarSize }}
          />
        ) : (
          icon
        )}
      </motion.div>
    </motion.div>
  );

  return isButton ? (
    <button
      onClick={handleClick}
      className="focus:outline-none"
    >
      {iconElement}
    </button>
  ) : href ? (
    <a onClick={handleClick} role="link">
      {iconElement}
    </a>
  ) : null;
};

export default IconContainer;


