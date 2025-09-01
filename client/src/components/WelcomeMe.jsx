import React from 'react';
import { useStateValue } from '../context/StateProvider';

const WelcomeMe = () => {
  // Access the user state from the context
  const [{ user }, dispatch] = useStateValue();

  // Get the user's name or use a default name
  const userName = user?.user?.name || 'Guest';

  return (
    <div className="text-md flex justify-center items-center gap-3">
      <span className="font-bold text-2xl">
        Welcome {userName}
      </span>
    </div>
  );
};

export default WelcomeMe;
