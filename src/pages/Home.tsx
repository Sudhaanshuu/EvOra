import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import { Helmet } from 'react-helmet';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>ExamPortal - Ace Your Placements & Technical Assessments</title>
        <meta name="description" content="Practice, prepare, and perform with our comprehensive platform for campus placements and technical assessments." />
      </Helmet>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </MainLayout>
  );
};

export default Home;