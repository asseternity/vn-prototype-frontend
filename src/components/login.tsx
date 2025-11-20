// dependencies
import { useState } from 'react';

// types
type LoginProps = {
  usernameCallback: Function;
};

function Login({ usernameCallback }: LoginProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    setPassword('');
    setUsername('');
    usernameCallback(username);
  };

  return (
    <div className="w-70 flex flex-col gap-5 rounded-xl border-2 border-white p-5 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Please log in
      </h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <label htmlFor="email" className="text-gray-700 font-medium">
          Username
        </label>
        <input
          value={username}
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="border-2 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <label htmlFor="password" className="text-gray-700 font-medium">
          Password
        </label>
        <input
          value={password}
          type="password"
          id="password"
          name="password"
          placeholder="********"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="border-2 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-lg transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
