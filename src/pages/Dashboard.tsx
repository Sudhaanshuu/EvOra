import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import DashboardComponent from '../components/dashboard/Dashboard';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet';

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <MainLayout>
      <Helmet>
        <title>Dashboard - ExamPortal</title>
        <meta name="description" content="Your ExamPortal dashboard with personalized recommendations and progress tracking." />
      </Helmet>
      <DashboardComponent />
    </MainLayout>
  );
};

export default Dashboard;