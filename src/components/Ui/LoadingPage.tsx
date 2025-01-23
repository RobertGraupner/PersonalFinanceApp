'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { LOADING_TEXTS } from '@/constants/stateMessages';

type LoadingTextType = (typeof LOADING_TEXTS)[number];

export function LoadingPage() {
  const [loadingText, setLoadingText] = useState<LoadingTextType>(
    LOADING_TEXTS[0]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(
        LOADING_TEXTS[Math.floor(Math.random() * LOADING_TEXTS.length)]
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-beige100 px-5 text-center">
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

      {/* Animated circle */}
      <div className="relative mb-8 h-24 w-24">
        {/* Outer rotating circles */}
        <motion.div
          className="absolute inset-0 rounded-full border-t-4 border-turquoise/40"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-t-4 border-turquoise/20"
          animate={{ rotate: -360 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-2 rounded-full bg-turquoise/10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Euro symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-2xl font-bold text-turquoise"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1, 0.95],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            €
          </motion.span>
        </div>
      </div>

      {/* Text */}
      <motion.p
        className="mb-4 min-h-12 text-preset-3 font-bold text-grey900"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {loadingText}
      </motion.p>
    </div>
  );
}
