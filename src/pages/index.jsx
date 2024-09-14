// src/pages/index.js
import { motion } from "framer-motion";
import { AnimatedTooltipPreview } from "../components/HomeComponents/tooltip";
import Layout from "../components/Layout";
import { AuroraBackground } from "../components/ui/aurora-background";
import { FlipWords } from "../components/ui/flip-words";
export default function Home() {
  const words = ["better", "cute", "beautiful", "modern"];
  return (
    
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold text-white text-center">
          Background lights 
          <FlipWords words={words} />
        </div>
        <div className="font-extralight text-base md:text-4xl text-neutral-200 py-4">
          And this, is chemical burn.
        </div>
        <button className=" bg-white rounded-full w-fit text-white text-black px-4 py-2">
          Debug now
        </button>
      </motion.div>
      <AnimatedTooltipPreview/>
    </AuroraBackground>
      
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
