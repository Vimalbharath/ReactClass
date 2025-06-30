import MountLifecycle from "./Mount/MountLifecycle";
import UpdateLifecycle from "./Update/UpdateLifecycle";
import UnmountLifecycle from "./Unmount/UnmountLifecycle";

function App() {
  return (
    <div >
      < MountLifecycle />
      < UpdateLifecycle />
      < UnmountLifecycle /> 
    </div>
  );
}

export default App;