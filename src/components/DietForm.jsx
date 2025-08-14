import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dietFormSchema, defaultValues } from '../schemas/dietFormSchema.js';
import Button from './Button.jsx';
import Input from './Input.jsx';
import Select from './Select.jsx';
import Textarea from './Textarea.jsx';
import AnimatedSection from './AnimatedSection.jsx';
import { useToast } from '../context/ToastContext.jsx';
import PdfPreviewModal from './PdfPreviewModal.jsx';
import ExportManager from './ExportManager.jsx';

function DietForm() {
  const { showSuccess, showError, showInfo } = useToast();
  const [showPdfPreview, setShowPdfPreview] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({
    resolver: zodResolver(dietFormSchema),
    defaultValues,
    mode: 'onChange'
  });

  // Watch weight and height to calculate BMI
  const weight = watch('weight');
  const height = watch('height');

  // Auto-calculate BMI when weight and height are provided
  useEffect(() => {
    if (weight && height) {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height) / 100; // Convert cm to meters
      
      if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
        const bmi = (weightNum / (heightNum * heightNum)).toFixed(1);
        setValue('bmi', bmi);
      }
    }
  }, [weight, height, setValue]);

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    
    // Show success toast
    showSuccess('Diet plan created successfully! 🎉', {
      duration: 4000
    });
    
    // Show info toast about PDF generation
    setTimeout(() => {
      showInfo('Use the export options below to save or preview your plan', {
        duration: 6000,
        persistent: false
      });
    }, 1000);
  };

  const formData = watch();

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="max-w-5xl mx-auto relative">
      {/* Form decoration background */}
      <div 
        className="absolute -top-10 -right-10 w-96 h-72 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/svg/form-decoration.svg')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="glass bg-white/90 backdrop-blur-xl shadow-large rounded-3xl p-8 md:p-12 my-8 border border-white/20">
        <AnimatedSection animation="animate-fade-in" className="mb-12 text-center">
          <h2 className="text-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent mb-4">
            Diet Plan Generator
          </h2>
          <p className="text-body text-lg text-secondary-600 max-w-2xl mx-auto">
            Fill out the form below to generate a personalized, professional diet plan tailored to your unique health goals and requirements
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
          </div>
        </AnimatedSection>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Client Information Section */}
        <AnimatedSection animation="animate-slide-in-left" delay={100}>
          <div className="bg-gradient-to-br from-primary-50/50 to-blue-50/50 p-8 rounded-2xl border border-primary-100/50 backdrop-blur-sm">
            <h3 className="text-subheading text-2xl font-bold text-primary-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-lg mr-3 flex items-center justify-center">
                <span className="text-white text-sm font-bold">👤</span>
              </div>
              Client Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Client Name *"
                register={register('name')}
                error={errors.name}
              />
              <Input
                placeholder="Age *"
                type="number"
                register={register('age')}
                error={errors.age}
              />
              <Select
                placeholder="Select Gender *"
                options={genderOptions}
                register={register('sex')}
                error={errors.sex}
              />
              <Input
                placeholder="Height (cm) *"
                type="number"
                register={register('height')}
                error={errors.height}
              />
              <Input
                placeholder="Weight (kg) *"
                type="number"
                step="0.1"
                register={register('weight')}
                error={errors.weight}
              />
              <Input
                placeholder="BMI (auto-calculated)"
                register={register('bmi')}
                error={errors.bmi}
                disabled
                className="bg-secondary-50/50 cursor-not-allowed"
              />
            </div>
            <div className="mt-6 space-y-4">
              <Textarea
                placeholder="Health Complications (if any)"
                register={register('complications')}
                error={errors.complications}
                rows={2}
              />
              <Textarea
                placeholder="Health Goals *"
                register={register('goals')}
                error={errors.goals}
                rows={3}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Meal Plan Section */}
        <AnimatedSection animation="animate-slide-in-right" delay={200}>
          <div className="bg-gradient-to-br from-accent-50/50 to-purple-50/50 p-8 rounded-2xl border border-accent-100/50 backdrop-blur-sm">
            <h3 className="text-subheading text-2xl font-bold text-accent-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-accent-500 rounded-lg mr-3 flex items-center justify-center">
                <span className="text-white text-sm font-bold">🍽️</span>
              </div>
              Daily Meal Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Textarea
                placeholder="Early Morning (7:00 AM) *"
                register={register('earlyMorning')}
                error={errors.earlyMorning}
                rows={2}
              />
              <Textarea
                placeholder="Mid Morning (10:30 AM)"
                register={register('midMorning')}
                error={errors.midMorning}
                rows={2}
              />
              <Textarea
                placeholder="Breakfast (8:30 AM) *"
                register={register('breakfast')}
                error={errors.breakfast}
                rows={2}
              />
              <Textarea
                placeholder="Evening Snacks (5:00-6:00 PM)"
                register={register('eveningSnacks')}
                error={errors.eveningSnacks}
                rows={2}
              />
              <Textarea
                placeholder="Lunch (12:00-1:30 PM) *"
                register={register('lunch')}
                error={errors.lunch}
                rows={2}
              />
              <Textarea
                placeholder="Dinner (8:00-9:00 PM) *"
                register={register('dinner')}
                error={errors.dinner}
                rows={2}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Additional Information Section */}
        <AnimatedSection animation="animate-slide-in-up" delay={300}>
          <div className="bg-gradient-to-br from-warning-50/50 to-orange-50/50 p-8 rounded-2xl border border-warning-100/50 backdrop-blur-sm">
            <h3 className="text-subheading text-2xl font-bold text-warning-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-warning-500 rounded-lg mr-3 flex items-center justify-center">
                <span className="text-white text-sm font-bold">📝</span>
              </div>
              Additional Information
            </h3>
            <div className="space-y-4">
              <Textarea
                placeholder="Foods to Avoid"
                register={register('foodsToAvoid')}
                error={errors.foodsToAvoid}
                rows={3}
              />
              <Textarea
                placeholder="Additional Notes"
                register={register('notes')}
                error={errors.notes}
                rows={4}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Action Buttons */}
        <AnimatedSection animation="animate-scale-in" delay={400}>
          <div className="space-y-6 pt-8 border-t-2 border-gradient-to-r from-primary-200 to-accent-200">
            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => reset()}
                disabled={!isDirty}
                className="sm:w-auto"
              >
                🔄 Reset Form
              </Button>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={!isValid}
                className="flex-1"
              >
                💾 Save Diet Plan
              </Button>
            </div>

            {/* Export Section */}
            <div className="bg-gradient-to-br from-primary-50/50 to-accent-50/50 p-6 rounded-2xl border border-primary-100/50 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-primary-800 mb-4 flex items-center">
                <div className="w-6 h-6 bg-primary-500 rounded-lg mr-3 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">📤</span>
                </div>
                Export & Preview Options
              </h3>
              
              <div className="space-y-4">
                {/* PDF Preview Button */}
                <Button
                  type="button"
                  variant="accent"
                  size="lg"
                  onClick={() => setShowPdfPreview(true)}
                  disabled={!isValid}
                  className="w-full"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    ✨ Preview & Download PDF
                  </div>
                </Button>

                {/* Multi-format Export */}
                <div className="pt-2">
                  <p className="text-sm text-secondary-600 mb-3 text-center">
                    Additional export formats for data backup and external use
                  </p>
                  <ExportManager formData={formData} />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* PDF Preview Modal */}
        <PdfPreviewModal
          isOpen={showPdfPreview}
          onClose={() => setShowPdfPreview(false)}
          formData={formData}
        />

        {/* Form Status */}
        {!isValid && isDirty && (
          <AnimatedSection animation="animate-slide-in-up">
            <div className="bg-error-50/80 border-2 border-error-200 rounded-xl p-6 backdrop-blur-sm mt-6">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-error-500 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-error-700 font-medium">
                  Please fill in all required fields correctly before using export options.
                </p>
              </div>
            </div>
          </AnimatedSection>
        )}
      </form>
    </div>
  );
}

export default DietForm;