import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import SignUpForm from '../components/auth/SignUpForm';
import { Helmet } from 'react-helmet';

const SignUp: React.FC = () => {
  return (
    <AuthLayout>
      <Helmet>
        <title>Sign Up - ExamPortal</title>
        <meta name="description" content="Create a new account on ExamPortal and start your journey to ace technical assessments and placement interviews." />
      </Helmet>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;