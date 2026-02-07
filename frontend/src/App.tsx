import { Button } from "./components/Button";

function App() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold font-mono text-neon-blue">CLARITY_OS</h1>
      <p className="text-text-secondary">System Online.</p>
      
      <div className="flex gap-4">
        <Button onClick={() => alert('Clicked!')}>Initialize</Button>
        <Button variant="outline">Scan</Button>
        <Button variant="danger">Purge</Button>
      </div>
    </div>
  );
}

export default App;