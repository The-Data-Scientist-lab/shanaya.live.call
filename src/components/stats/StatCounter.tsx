import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface StatCounterProps {
  end: number;
  duration?: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  end,
  duration = 2000,
  label,
  prefix = '',
  suffix = '',
  icon
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  const hasAnimated = useRef(false);
  const prevEndRef = useRef(end);
  
  useEffect(() => {
    if (prevEndRef.current !== end) {
      hasAnimated.current = false;
      prevEndRef.current = end;
    }
    
    if (!inView || hasAnimated.current) return;
    
    hasAnimated.current = true;
    let startTime: number;
    let animationFrame: number;
    
    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * end));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(countUp);
      }
    };
    
    animationFrame = requestAnimationFrame(countUp);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, end, duration]);
  
  return (
    <div className="text-center" ref={ref}>
      {icon && <div className="flex justify-center mb-2">{icon}</div>}
      <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-vibrant-purple to-vibrant-cyan bg-clip-text text-transparent">
        {prefix}{count.toLocaleString()}{suffix}
      </h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};
