import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

const Dashboard = () => {
  return <h1>Welcome to your dashboard!</h1>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.authToken;
  
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Dashboard;
