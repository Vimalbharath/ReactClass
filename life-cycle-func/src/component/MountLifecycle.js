import React, { useEffect } from 'react';

function MountLifecycle() {
  useEffect(() => {
    console.log("✅ Component mounted (like componentDidMount)");

    // API calls, event listeners, etc.
  }, []); // Empty dependency = only once on mount

  return <h2>Mounting Demo (Check console)</h2>;
}

export default MountLifecycle;
