// dependencies
import { useState } from 'react';

// components
import Login from './components/login';
import Game from './components/game';

function App() {
  const [username, setUsername] = useState<string>('');

  return (
    <div className="h-full w-full flex justify-center items-center">
      {username === '' ? (
        <Login usernameCallback={setUsername} />
      ) : (
        <Game username={username} />
      )}
    </div>
  );
}

export default App;
