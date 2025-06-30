import logo from './logo.svg';
import './App.css';
import MountLifecycle from './component/MountLifecycle';
import UpdateLifecycle from './component/UpdateLifecycle';
import UnmountLifecycle from './component/UnmountLifecycle';
import ParentComponent from './component/ParentComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MountLifecycle />
        <UpdateLifecycle />
        <UnmountLifecycle />
        <ParentComponent />
      </header>
    </div>
  );
}

export default App;
