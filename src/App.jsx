import React from 'react';
import DietForm from "./components/DietForm";
import AnimatedSection from "./components/AnimatedSection";
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/ToastContainer";
import PageTransition from "./components/PageTransition";

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Premium background with SVG pattern */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
          style={{
            backgroundImage: `url('/assets/svg/hero-pattern.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Parallax floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200/20 rounded-full animate-float" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-16 h-16 bg-accent-200/20 rounded-lg rotate-12 animate-float" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-success-200/20 rounded-full animate-float" 
               style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 right-40 w-24 h-24 bg-warning-200/20 rounded-xl rotate-45 animate-float" 
               style={{ animationDelay: '0.5s' }} />
        </div>
        
        {/* Main content with page transitions */}
        <PageTransition transition="fade" duration={500}>
          {/* Premium Header */}
          <header className="flex flex-col items-center justify-center py-8 px-4 bg-white/90 backdrop-blur-sm shadow-soft rounded-b-2xl mb-8 border-b border-white/20">
            <AnimatedSection animation="animate-scale-in" className="flex flex-col items-center">
              <img 
                src="/assets/svg/logo-leaf-progress.svg" 
                alt="Priya Jana Diet Plan App Logo - Leaf of Progress" 
                className="w-16 h-16 mb-3 animate-float"
                style={{ animationDelay: '0.5s' }}
              />
              <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-success-600 to-primary-700 bg-clip-text text-transparent text-center leading-tight">
                Priya Jana Diet Plan App
              </h1>
              <p className="text-sm md:text-base text-secondary-600 mt-2 text-center max-w-md">
                Transform Your Health with Personalized Nutrition Plans
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-success-500 to-primary-500 rounded-full animate-pulse-soft" />
              </div>
            </AnimatedSection>
          </header>

          <div className="container mx-auto px-4">
            <AnimatedSection 
              animation="animate-scale-in" 
              delay={200}
              className="relative"
            >
              <DietForm />
            </AnimatedSection>
          </div>
        </PageTransition>
        
        {/* Decorative bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
      </div>
      
      {/* Toast notifications */}
      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
