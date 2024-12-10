import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser } from '../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // update email state
              className="w-full p-2 border border-gray-300 text-gray-700 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // update password state
              className="w-full p-2 border text-gray-700 border-gray-300 rounded"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Show error message */}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;