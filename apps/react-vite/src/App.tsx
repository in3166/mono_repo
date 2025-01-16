import { useState } from 'react';
import './App.css';
import { SButton } from '@ijyu-3166/ui-lib';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <SButton variant="destructive">PLUS</SButton>
      </div>
    </>
  );
}

export default App;
