import { AnimatePresence, delay, motion } from "framer-motion";
import HomePage from "@/pages/home";

const PageTransition = (Page, key) => {
  return function TransitionWrapper(props) {
    const transition = {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
      },
      transition: {
        duration: 2,
        delay: 1,
      },
    };

    return (
      <AnimatePresence>
        <motion.div
          key={key}
          initial={transition.initial}
          animate={transition.animate}
          transition={transition.transition}
          exit={transition.initial}
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    );
  };
};

export default PageTransition;
