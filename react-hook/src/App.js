import React from 'react';
import './App.css';
import CompareState from './reactHooks/CompareState';
//import DemouseState from './reactHooks/DemouseState';
import NotepadApp from './reactHooks/NotepadApp';
//import UseEffectCleanUpDemo from './reactHooks/UseEffectCleanUpDemo';
//import UseEffectDemo from './reactHooks/UseEffectDemo';
//import UseReducerDemo from './reactHooks/UseReducerDemo';
//import Todos from './customHook/Todos';
function App() {
  return (
    <div className="App">
      {/* <DemouseState/> */}
      <CompareState count={0}/>
      {/* <NotepadApp/> */}
      {/* <UseEffectDemo/> */}
     {/*  <UseEffectCleanUpDemo/> */}
      {/* <UseReducerDemo/> */}
      {/* <Todos></Todos> */}
    </div>
  );
}

export default App;
