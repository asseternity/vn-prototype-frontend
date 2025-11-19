// dependencies
import { useState } from 'react';

// components
import Login from './components/login';
import HexMap from './components/hex_map';

function App() {
  const [username, setUsername] = useState<string>('');

  return (
    <div className="h-full w-full flex justify-center items-center">
      {username === '' ? <Login usernameCallback={setUsername} /> : <HexMap />}
    </div>
  );
}

export default App;
