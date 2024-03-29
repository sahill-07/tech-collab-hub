import React, { useState, useRef } from 'react'
import { HastTagCards } from '../TagInput/HastTagCards';
import { AnimatePresence, motion } from 'framer-motion';
import './ProjectCardSkeleton.css';


// card drag out animation
const items = [
  { id: 1, subtitle: 'Subtitle 1', title: 'Title 1' },
  { id: 2, subtitle: 'Subtitle 2', title: 'Title 2' },
  { id: 3, subtitle: 'Subtitle 3', title: 'Title 3' }
];

const ProjectCardSkeleton = () => {
  const [selectedId, setSelectedId] = useState(null);
  
    return (
      <div>
      {items.map(item => (
        <motion.div 
          key={item.id}
          layoutId={item.id} 
          onClick={() => setSelectedId(item.id)}
          style={{ cursor: 'pointer', marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0' }}
        >
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            key={selectedId}
            layoutId={selectedId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0' }}
          >
            <motion.h5>{items.find(item => item.id === selectedId).subtitle}</motion.h5>
            <motion.h2>{items.find(item => item.id === selectedId).title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)}>Close</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    )
}

export default ProjectCardSkeleton
