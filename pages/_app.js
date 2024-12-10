import { AuthProvider } from '../context/AuthContext';
 // Make sure to adjust the path to your context
 import "../app/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
