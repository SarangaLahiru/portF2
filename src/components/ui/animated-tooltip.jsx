"use client";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const AnimatedTooltip = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAutoHovering, setIsAutoHovering] = useState(true); // State to control auto-hover behavior

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); 
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  // Effect to auto-trigger hover on each item one by one
  useEffect(() => {
    if (!isAutoHovering) return; // If manual hover has started, stop auto-hover

    let currentIndex = 0;
    const interval = setInterval(() => {
      setHoveredIndex(items[currentIndex].id); 
      currentIndex++;
      if (currentIndex >= items.length) {
        currentIndex = 0; // Restart from the beginning after the last item
      }
    }, 2000);

    return () => {
      clearInterval(interval); // Clean up interval on unmount
    };
  }, [items, isAutoHovering]);

  const handleMouseEnter = (id) => {
    setHoveredIndex(id); // Trigger manual hover
    setIsAutoHovering(false); // Disable auto-hover when user interacts
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsAutoHovering(true); // Re-enable auto-hover when user stops interacting
  };

  return (
    <>
      {items.map((item) => (
        <div
          className="-mr-4 relative group"
          key={item.name}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
                <div className="font-bold text-white relative z-30 text-base">
                  {item.name}
                </div>
                <div className="text-white text-xs">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
          />
        </div>
      ))}
    </>
  );
};
