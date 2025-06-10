import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AdminDebug from '../components/debug/AdminDebug';
import { Helmet } from 'react-helmet';

const AdminDebugPage: React.FC = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Admin Debug - EvOra</title>
      </Helmet>
      <div className="py-16">
        <AdminDebug />
      </div>
    </MainLayout>
  );
};

export default AdminDebugPage;