import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface AIAnalysisProps {
  analysis: string | null;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ analysis }) => {
  if (!analysis) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1E2A59]/90 p-6 rounded-2xl shadow-lg border-2 border-[#3A4B80] mb-8"
    >
      <div className="flex items-center mb-4">
        <div className="h-6 w-6 mr-2 rounded-full bg-purple-500"></div>
        <h3 className="text-xl font-medium">AI Strategy Analysis</h3>
      </div>
      
      <div className="prose prose-invert max-w-none">
        {analysis.split('\n').map((paragraph, index) => (
          <p key={index} className="text-gray-300 mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
}; 