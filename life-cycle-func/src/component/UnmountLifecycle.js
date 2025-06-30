import React, { useEffect } from 'react';

function UnmountLifecycle() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("⏰ Timer running...");
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log("🛑 Cleanup: Component unmounted (Timer cleared)");
    };
  }, []); // Empty dependency → runs once

  return <h3>Unmount Demo (Check console)</h3>;
}

export default UnmountLifecycle;
