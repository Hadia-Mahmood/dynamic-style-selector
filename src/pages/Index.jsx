
import React from 'react';
import RoofingForm from '@/components/RoofingForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-1">
          <span className="text-xs uppercase tracking-wider text-gray-500">Smart</span>
        </h1>
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Roofing Project Questionnaire
        </h2>
        <RoofingForm />
      </div>
    </div>
  );
};

export default Index;
