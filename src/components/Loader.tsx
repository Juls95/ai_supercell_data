import React from 'react';
import { motion } from 'framer-motion';
import { Sword } from 'lucide-react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
        className="mb-4"
      >
        <Sword size={48} className="text-[#F5793B]" />
      </motion.div>
      <p className="text-gray-300">Searching for strategies...</p>
    </div>
  );
};