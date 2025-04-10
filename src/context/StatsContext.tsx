import React, { createContext, useContext, useState, useEffect } from 'react';

interface StatsContextType {
  sessionsDelivered: number;
  epicLines: number;
  // For testing purposes - will be removed in production
  simulateUpdate?: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

// Keys for localStorage
const SESSIONS_KEY = 'vidflow_sessions_delivered';
const EPIC_LINES_KEY = 'vidflow_epic_lines';
const LAST_UPDATE_KEY = 'vidflow_last_update';

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial values from localStorage or use defaults
  const getInitialSessions = () => {
    const stored = localStorage.getItem(SESSIONS_KEY);
    return stored ? parseInt(stored, 10) : 1583;
  };

  const getInitialEpicLines = () => {
    const stored = localStorage.getItem(EPIC_LINES_KEY);
    return stored ? parseInt(stored, 10) : 3;
  };

  const [sessionsDelivered, setSessionsDelivered] = useState(getInitialSessions);
  const [epicLines, setEpicLines] = useState(getInitialEpicLines);

  // Function to update stats
  const updateStats = () => {
    setSessionsDelivered(prev => {
      const newValue = prev + 10;
      localStorage.setItem(SESSIONS_KEY, newValue.toString());
      return newValue;
    });
    
    setEpicLines(prev => {
      const newValue = prev + 3;
      localStorage.setItem(EPIC_LINES_KEY, newValue.toString());
      return newValue;
    });
    
    localStorage.setItem(LAST_UPDATE_KEY, Date.now().toString());
  };

  // Function to simulate faster updates (for testing)
  const simulateUpdate = () => {
    updateStats();
  };

  useEffect(() => {
    // Check if we need to update based on last update time
    const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY);
    const now = Date.now();
    
    if (lastUpdate) {
      const timeSinceLastUpdate = now - parseInt(lastUpdate, 10);
      const threeHoursInMs = 3 * 60 * 60 * 1000;
      
      // If more than 3 hours have passed, update immediately
      if (timeSinceLastUpdate >= threeHoursInMs) {
        updateStats();
      }
    } else {
      // First time running, set initial update time
      localStorage.setItem(LAST_UPDATE_KEY, now.toString());
    }

    // Set up interval to update stats every 3 hours
    const intervalId = setInterval(updateStats, 3 * 60 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StatsContext.Provider value={{ 
      sessionsDelivered, 
      epicLines,
      simulateUpdate // For testing purposes
    }}>
      {children}
    </StatsContext.Provider>
  );
}; 