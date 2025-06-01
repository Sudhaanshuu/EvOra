import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import { Helmet } from 'react-helmet';

const Login: React.FC = () => {
  return (
    <AuthLayout>
      <Helmet>
        <title>Log In - ExamPortal</title>
        <meta name="description" content="Log in to your ExamPortal account to access your dashboard and continue your preparation." />
      </Helmet>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;