import { connectWithWebSocket } from './utils/wssConnection/wssConnection.ts';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard.tsx';
import LoginPage from './LoginPage/LoginPage.tsx';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/',
    element: <LoginPage />
  }
]);

function App() {
  useEffect(() => {
    connectWithWebSocket();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
