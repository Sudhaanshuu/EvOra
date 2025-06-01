import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { Helmet } from 'react-helmet';

const ForgotPassword: React.FC = () => {
  return (
    <AuthLayout>
      <Helmet>
        <title>Forgot Password - ExamPortal</title>
        <meta name="description" content="Reset your ExamPortal account password." />
      </Helmet>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;