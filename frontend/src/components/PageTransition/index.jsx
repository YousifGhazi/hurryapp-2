import { motion } from "framer-motion";

const PageTransition = (Page, options) => {
  return function TransitionWrapper() {
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
