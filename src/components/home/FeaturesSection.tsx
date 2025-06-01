import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Award, Users, CheckCircle } from 'lucide-react';

const features = [
  {
    id: 'coding',
    icon: <Code className="h-6 w-6" />,
    title: 'Real-time Coding Environment',
    description: 'Practice coding with our interactive IDE that supports multiple programming languages and provides instant feedback.',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: [
      'Supports 20+ programming languages',
      'Real-time syntax checking',
      'Auto-evaluation of solutions',
      'Save your progress and solutions'
    ]
  },
  {
    id: 'assessment',
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Comprehensive Assessments',
    description: 'Prepare with a wide range of aptitude tests, technical assessments, and domain-specific evaluations.',
    image: 'https://images.pexels.com/photos/6256085/pexels-photo-6256085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: [
      'Quantitative aptitude questions',
      'Technical MCQs across domains',
      'Detailed performance analytics',
      'Personalized question bank'
    ]
  },
  {
    id: 'interviews',
    icon: <Users className="h-6 w-6" />,
    title: 'Mock Interviews',
    description: 'Practice with simulated interview sessions that mimic real-world technical and HR interviews.',
    image: 'https://images.pexels.com/photos/7654105/pexels-photo-7654105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: [
      'One-on-one interview practice',
      'AI-powered feedback',
      'Industry-specific questions',
      'Video recording for self-analysis'
    ]
  },
  {
    id: 'certificates',
    icon: <Award className="h-6 w-6" />,
    title: 'Certifications & Leaderboards',
    description: 'Earn certificates, badges, and compete with peers to showcase your skills to potential employers.',
    image: 'https://images.pexels.com/photos/8867431/pexels-photo-8867431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    benefits: [
      'Skill-based certifications',
      'Global and college leaderboards',
      'Sharable achievements',
      'Performance-based badges'
    ]
  }
];

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  const currentFeature = features.find(feature => feature.id === activeFeature) || features[0];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Powerful Features to Supercharge Your Preparation
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything you need to practice, prepare and ace your technical assessments and placement interviews.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {features.map((feature) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full flex items-start text-left p-4 rounded-lg transition-all duration-200 ${
                    activeFeature === feature.id
                      ? 'bg-indigo-50 border-l-4 border-indigo-600'
                      : 'hover:bg-gray-50'
                  }`}
                  whileHover={{ x: activeFeature !== feature.id ? 5 : 0 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={`flex-shrink-0 ${
                    activeFeature === feature.id ? 'text-indigo-600' : 'text-gray-400'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <p className={`text-lg font-medium ${
                      activeFeature === feature.id ? 'text-indigo-600' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <motion.div 
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-xl"
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img 
                  src={currentFeature.image} 
                  alt={currentFeature.title} 
                  className="object-cover w-full h-64"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{currentFeature.title}</h3>
                <p className="text-gray-600 mb-6">{currentFeature.description}</p>
                
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Key Benefits</h4>
                <ul className="space-y-3">
                  {currentFeature.benefits.map((benefit, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;