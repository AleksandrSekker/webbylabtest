import React from "react";
import { motion } from "framer-motion";
import styles from "./sass/sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IMenuItem } from "./types";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({ icon, text }: IMenuItem) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={styles.li}
    >
      <div className={styles.iconPlaceholder}>
        <FontAwesomeIcon
          icon={icon}
          className={styles.iconPlaceholder}
          aria-hidden="true"
        />
      </div>
      <div className={styles.textPlaceholder}>{text}</div>
    </motion.li>
  );
};
