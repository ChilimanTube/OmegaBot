import { useEffect, useState } from 'react';

const InteractionsCount = () => {
  const [interactionsCount, setInteractionsCount] = useState(0);

  useEffect(() => {
    const fetchInteractionsCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/interactions');
        const data = await response.json();
        setInteractionsCount(data.count);
      } catch (error) {
        console.error('Error fetching interactions count:', error);
      }
    };

    fetchInteractionsCount();
  }, []);

  return <div>Interactions count: {interactionsCount}</div>;
};

export default InteractionsCount;