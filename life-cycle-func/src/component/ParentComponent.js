import React, { useState } from 'react';
import UnmountLifecycle from './UnmountLifecycle';

function ParentComponent() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow(prev => !prev)}>Toggle Child</button>
      {show && <UnmountLifecycle />}
    </div>
  );
}

export default ParentComponent;
