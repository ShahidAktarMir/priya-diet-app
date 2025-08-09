import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { dietFormSchema, defaultValues } from '../schemas/dietFormSchema.js';
import Button from './Button.jsx';
import Input from './Input.jsx';
import Select from './Select.jsx';
import Textarea from './Textarea.jsx';
import DietPDF from './DietPdf.jsx';

function DietForm() {
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
    // You can add additional logic here if needed
  };

  const formData = watch();

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 my-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Diet Plan Generator</h2>
        <p className="text-gray-600">Fill out the form below to generate a personalized diet plan</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Client Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Client Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              className="bg-gray-100"
            />
          </div>
          <div className="mt-4">
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

        {/* Meal Plan Section */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Meal Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Additional Information Section */}
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={() => reset()}
            disabled={!isDirty}
          >
            Reset Form
          </Button>
          
          <PDFDownloadLink
            document={<DietPDF data={formData} />}
            fileName={`${formData.name || "client"}-diet-chart.pdf`}
            className="flex-1"
          >
            {({ loading }) => (
              <Button
                variant="success"
                disabled={loading || !isValid}
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating PDF...
                  </span>
                ) : (
                  "Generate Diet Plan PDF"
                )}
              </Button>
            )}
          </PDFDownloadLink>
        </div>

        {/* Form Status */}
        {!isValid && isDirty && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">
              Please fill in all required fields correctly before generating the PDF.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default DietForm;