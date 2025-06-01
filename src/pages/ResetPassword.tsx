import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import { Helmet } from 'react-helmet';

const ResetPassword: React.FC = () => {
  return (
    <AuthLayout>
      <Helmet>
        <title>Reset Password - ExamPortal</title>
        <meta name="description" content="Create a new password for your ExamPortal account." />
      </Helmet>
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;