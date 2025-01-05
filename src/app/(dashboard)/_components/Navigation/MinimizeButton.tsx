import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { MinimizeButtonProps } from '@/types/navigation';

export function MinimizeButton({
  isMinimized,
  onMinimize,
}: MinimizeButtonProps) {
  return (
    <button
      onClick={onMinimize}
      className="mb-28 mt-auto flex h-14 w-fit items-center gap-4 text-nowrap rounded-lg ps-8 text-preset-3 text-grey300 transition-colors hover:text-white"
    >
      <motion.div
        animate={{ rotate: isMinimized ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/images/icon-minimize-menu.svg"
          alt="Minimize menu"
          width={24}
          height={24}
        />
      </motion.div>
      <AnimatePresence>
        {!isMinimized && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: 1,
              width: 'auto',
              transition: {
                delay: 0.2,
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              width: 0,
              transition: {
                duration: 0.2,
              },
            }}
          >
            Minimize Menu
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
