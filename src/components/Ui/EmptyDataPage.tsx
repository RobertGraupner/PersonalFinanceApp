import { motion } from 'framer-motion';
import Image from 'next/image';
import { EMPTY_DATA_TEXTS } from '@/constants/stateMessages';
import { EmptyDataPageProps } from '@/types/ui';

export function EmptyDataPage({ viewType }: EmptyDataPageProps) {
  const { title, description } = EMPTY_DATA_TEXTS[viewType];
  return (
    <div className="-mt-6 flex h-full flex-col items-center justify-center bg-beige100 px-5 text-center md:-mt-8">
      {/* Logo */}
      <motion.div
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.98, 1, 0.98],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mb-8"
      >
        <Image
          src="/images/logo-large.svg"
          alt="Finance logo"
          width={120}
          height={22}
          className="mx-auto"
          style={{ filter: 'invert(0.12) brightness(0.2)' }}
        />
      </motion.div>

      {/* Content */}
      <div className="max-w-md">
        <motion.h2
          className="mb-4 text-preset-3 font-bold text-grey900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-preset-4 text-grey500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}
