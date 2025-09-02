// Filename: components/AnimatedTitle.tsx

import React from 'react';

interface AnimatedTitleProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  // 1. Add a new prop to accept the icon component
  icon?: React.ReactNode;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ children, as: Tag = 'h1', className, icon }) => {
  return (
    // 2. Change to `inline-flex` to align the icon and text.
    //    `items-center` vertically aligns them, and `gap-3` adds space.
    <Tag className={`group relative inline-flex items-center gap-3 ${className}`}>
      {/* 3. Render the icon if it's provided */}
      {icon}

      {/* 4. A new wrapper is needed around the text. */}
      {/*    This ensures the underline only spans the width of the text, not the icon. */}
      <span className="relative inline-block">
        {children}
        <span 
          className="
            absolute bottom-0 left-0 w-full h-[2px] bg-white
            transform scale-x-0 group-hover:scale-x-100
            transition-transform duration-300 ease-in-out
            origin-left
          "
        />
      </span>
    </Tag>
  );
};

export default AnimatedTitle;