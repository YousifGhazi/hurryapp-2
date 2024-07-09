import { AnimatePresence, delay, motion } from "framer-motion";
import HomePage from "@/pages/home";

const PageTransition = (Page, options) => {
  return function TransitionWrapper(props) {
    const transition = {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
      },
      transition: {
        duration: 1,
      },
    };

    return (
      <motion.div
        key={options?.key}
        initial={transition.initial}
        animate={transition.animate}
        transition={transition.transition}
        exit={transition.initial}
      >
        <Page />
      </motion.div>
    );
  };
};

export default PageTransition;
