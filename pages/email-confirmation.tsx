import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EmailConfirmation: React.FC = () => {
  const router = useRouter();
  const { confirmation_token } = router.query;
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const confirmEmail = async () => {
      // Exit early if no token is available in the URL
      if (!confirmation_token) return;

      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/auth/confirmation?confirmation_token=${confirmation_token}`,
          {
            method: 'POST', // Ensure this is a POST request
          }
        );

        // If response is successful, update message and state
        if (response.ok) {
          const data = await response.json();
          setStatusMessage(data.message || 'Your email has been confirmed successfully!');
          setIsError(false); // Reset error flag
        } else {
          const data = await response.json();
          setStatusMessage(data.error || 'Email confirmation failed.');
          setIsError(true); // Set error flag if confirmation failed
        }
      } catch (err) {
        setStatusMessage('An unexpected error occurred. Please try again later.');
        setIsError(true);
      }
    };

    confirmEmail();
  }, [confirmation_token]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {isError ? (
        <p style={{ color: 'red' }}>{statusMessage}</p>
      ) : (
        <p style={{ color: 'green' }}>{statusMessage}</p>
      )}
    </div>
  );
};

export default EmailConfirmation;
