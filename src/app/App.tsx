import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './features/auth/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <div className="dark bg-gray-50">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}
