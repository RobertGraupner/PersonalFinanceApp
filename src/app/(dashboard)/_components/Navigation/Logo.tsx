import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoProps {
  isMinimized: boolean;
}

export function Logo({ isMinimized }: LogoProps) {
  return (
    <AnimatePresence mode="wait">
      {isMinimized ? (
        <motion.div
          key="small-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="ms-[36px]"
        >
          <Image
            src="/images/logo-small.svg"
            alt="Finance"
            width={14}
            height={22}
            priority
          />
        </motion.div>
      ) : (
        <motion.div
          key="large-logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="ms-8"
        >
          <Image
            src="/images/logo-large.svg"
            alt="Finance"
            width={120}
            height={22}
            priority
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
