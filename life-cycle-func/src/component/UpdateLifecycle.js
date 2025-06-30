import React, { useState, useEffect } from 'react';

function UpdateLifecycle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count !== 0) {
      console.log("🔁 Component updated: count is", count);
    }
  }, [count]); // Triggers only when `count` changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
}

export default UpdateLifecycle;
