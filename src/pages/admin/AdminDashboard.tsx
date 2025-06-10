import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import AdminDashboardComponent from '../../components/admin/AdminDashboard';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet';
import { supabase } from '../../lib/supabase';

const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user?.email) {
        setIsAdmin(false);
        return;
      }

      try {
        console.log('AdminDashboard: Checking admin status for:', user.email);
        
        const { data, error } = await supabase
          .from('admin_emails')
          .select('email')
          .eq('email', user.email)
          .maybeSingle();
        
        if (error) {
          console.error('AdminDashboard: Error checking admin status:', error);
          setIsAdmin(false);
          return;
        }
        
        const adminStatus = !!data;
        console.log('AdminDashboard: Admin status result:', adminStatus, 'Data:', data);
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error('AdminDashboard: Exception checking admin status:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user?.email]);

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <MainLayout>
      <Helmet>
        <title>Admin Dashboard - EvOra</title>
        <meta name="description" content="Admin dashboard for managing EvOra platform." />
      </Helmet>
      <AdminDashboardComponent />
    </MainLayout>
  );
};

export default AdminDashboard;