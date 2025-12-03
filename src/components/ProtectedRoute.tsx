import useUserStore from '@stores/userStore';
import { Navigate, Outlet } from 'react-router-dom';


export const ProtectedRoute = () => {
    const { currentUser } = useUserStore()
    if (!currentUser) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};
