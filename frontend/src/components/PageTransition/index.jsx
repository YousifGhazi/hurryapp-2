import { AnimatePresence, delay, motion } from "framer-motion";
import HomePage from "@/pages/home";

const PageTransition = (Page) => {
  return function TransitionWrapper(props) {
    const transition = {
      initial: {
        borderRadius: "50%",
        width: 0,
        height: 0,
        opacity: 0,
        x: "50vw",
        y: "50vh",
        position: "fixed",
        overflow: "hidden",
        zIndex: 999,
      },
      animate: {
        width: "100vw",
        height: "100vh",
        x: 0,
        y: 0,
        opacity: 1,
        overflow: "auto",
      },
      transition: {
        duration: 1.5,
        delay: 1,
      },
    };

    return (
      <AnimatePresence>
        <motion.div
          key="page-transition"
          // variants={transition}
          initial={transition.initial}
          animate={transition.animate}
          transition={transition.transition}
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    );
  };
};

export default PageTransition;
