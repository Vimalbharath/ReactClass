import React, { useEffect, useRef } from 'react';

const FuncRef = () => {
  const inputRef = useRef(null);      // Equivalent to this.inputRef
  let cbRef = null;                   // Equivalent to this.cbRef

  // Callback ref setter
  const setCbRef = (element) => {
    cbRef = element;
  };

  useEffect(() => {
    // Uncomment this to use useRef focus
    //if (inputRef.current) inputRef.current.focus();

    // Focus the callback ref input
    if (cbRef) cbRef.focus();
  }, []);

  const clickHandler = () => {
    alert(inputRef.current.value);
  };

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="useRef" />
      <input type="text" ref={setCbRef} placeholder="callback ref" />
      <button onClick={clickHandler}>Click</button>
    </div>
  );
};

export default FuncRef;
