import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const router = useRouter();
  const { reset_token } = router.query;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (reset_token) {
      setLoading(false); // Set loading to false once reset_token is available
    }
  }, [reset_token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!reset_token) {
      setError('Reset token is missing.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/auth/password_reset?reset_token=${reset_token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Your password has been successfully reset!');
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  if (loading) {
    // Display loading message until reset_token is available
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <p className="text-center text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Reset Your Password</h2>

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">New Password</label>
            <input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
              className="w-full p-3 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
              className="w-full p-3 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Reset Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        )}

        {error && (
          <p className="mt-4 text-red-600 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;