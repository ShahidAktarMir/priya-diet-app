import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

function ExportManager({ formData, className = '' }) {
  const [isExporting, setIsExporting] = useState(false);
  const { showSuccess, showError, showInfo } = useToast();

  // Generate comprehensive JSON export
  const exportToJSON = async () => {
    try {
      setIsExporting(true);
      showInfo('Preparing JSON export...', { duration: 2000 });

      // Add metadata to the export
      const exportData = {
        metadata: {
          exportDate: new Date().toISOString(),
          exportVersion: '1.0.0',
          applicationName: 'Priya Jana Diet Plan App',
          clientId: formData.name ? formData.name.toLowerCase().replace(/\s+/g, '-') : 'unnamed-client',
          planType: 'daily-meal-plan',
          dataFormat: 'json'
        },
        clientInformation: {
          name: formData.name || '',
          age: formData.age || '',
          gender: formData.sex || '',
          height: formData.height || '',
          weight: formData.weight || '',
          bmi: formData.bmi || '',
          healthComplications: formData.complications || '',
          healthGoals: formData.goals || ''
        },
        mealPlan: {
          earlyMorning: {
            time: '7:00 AM',
            description: formData.earlyMorning || '',
            notes: 'On empty stomach'
          },
          breakfast: {
            time: '8:30 AM',
            description: formData.breakfast || '',
            notes: 'Main meal'
          },
          midMorning: {
            time: '10:30 AM',
            description: formData.midMorning || '',
            notes: 'Light snack'
          },
          lunch: {
            time: '12:00-1:30 PM',
            description: formData.lunch || '',
            notes: 'Complete meal'
          },
          eveningSnacks: {
            time: '5:00-6:00 PM',
            description: formData.eveningSnacks || '',
            notes: 'Light & healthy'
          },
          dinner: {
            time: '8:00-9:00 PM',
            description: formData.dinner || '',
            notes: 'Light dinner'
          }
        },
        additionalInformation: {
          foodsToAvoid: formData.foodsToAvoid || '',
          specialNotes: formData.notes || ''
        },
        planValidation: {
          validFrom: new Date().toISOString().split('T')[0],
          validUntil: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 weeks
          createdBy: 'Priya - Certified Nutritionist'
        }
      };

      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.name || 'client'}-diet-plan-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      showSuccess('JSON export completed successfully! 📄', { duration: 4000 });
    } catch (error) {
      console.error('JSON export error:', error);
      showError('Failed to export JSON. Please try again.', { duration: 5000 });
    } finally {
      setIsExporting(false);
    }
  };

  // Generate CSV export
  const exportToCSV = async () => {
    try {
      setIsExporting(true);
      showInfo('Preparing CSV export...', { duration: 2000 });

      // Create CSV headers and data
      const csvData = [
        // Client Information Section
        ['SECTION', 'CLIENT INFORMATION'],
        ['Field', 'Value'],
        ['Name', formData.name || ''],
        ['Age', formData.age || ''],
        ['Gender', formData.sex || ''],
        ['Height (cm)', formData.height || ''],
        ['Weight (kg)', formData.weight || ''],
        ['BMI', formData.bmi || ''],
        ['Health Complications', formData.complications || ''],
        ['Health Goals', formData.goals || ''],
        [''], // Empty row for separation
        
        // Meal Plan Section
        ['SECTION', 'DAILY MEAL PLAN'],
        ['Meal Time', 'Time', 'Description', 'Notes'],
        ['Early Morning', '7:00 AM', formData.earlyMorning || '', 'On empty stomach'],
        ['Breakfast', '8:30 AM', formData.breakfast || '', 'Main meal'],
        ['Mid Morning', '10:30 AM', formData.midMorning || '', 'Light snack'],
        ['Lunch', '12:00-1:30 PM', formData.lunch || '', 'Complete meal'],
        ['Evening Snacks', '5:00-6:00 PM', formData.eveningSnacks || '', 'Light & healthy'],
        ['Dinner', '8:00-9:00 PM', formData.dinner || '', 'Light dinner'],
        [''], // Empty row for separation
        
        // Additional Information Section
        ['SECTION', 'ADDITIONAL INFORMATION'],
        ['Field', 'Value'],
        ['Foods to Avoid', formData.foodsToAvoid || ''],
        ['Special Notes', formData.notes || ''],
        [''], // Empty row for separation
        
        // Metadata Section
        ['SECTION', 'EXPORT METADATA'],
        ['Field', 'Value'],
        ['Export Date', new Date().toISOString()],
        ['Plan Valid From', new Date().toISOString().split('T')[0]],
        ['Plan Valid Until', new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]],
        ['Created By', 'Priya - Certified Nutritionist'],
        ['Application', 'Priya Jana Diet Plan App'],
        ['Version', '1.0.0']
      ];

      // Convert to CSV string
      const csvString = csvData
        .map(row => 
          row.map(cell => {
            // Escape quotes and wrap in quotes if contains comma, quote, or newline
            const cellString = String(cell || '');
            if (cellString.includes(',') || cellString.includes('"') || cellString.includes('\n')) {
              return `"${cellString.replace(/"/g, '""')}"`;
            }
            return cellString;
          }).join(',')
        )
        .join('\n');

      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.name || 'client'}-diet-plan-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      showSuccess('CSV export completed successfully! 📊', { duration: 4000 });
    } catch (error) {
      console.error('CSV export error:', error);
      showError('Failed to export CSV. Please try again.', { duration: 5000 });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      {/* JSON Export Button */}
      <button
        onClick={exportToJSON}
        disabled={isExporting}
        className={`
          flex items-center justify-center px-4 py-3 rounded-xl font-medium text-sm
          transition-all duration-300 transform-gpu
          ${isExporting 
            ? 'bg-secondary-200 text-secondary-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 hover:scale-105 hover:shadow-glow-accent active:scale-95'
          }
          focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
          shadow-soft
        `}
      >
        {isExporting ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-secondary-400 border-t-transparent rounded-full animate-spin mr-2"></div>
            <span>Exporting...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Export JSON
          </div>
        )}
      </button>

      {/* CSV Export Button */}
      <button
        onClick={exportToCSV}
        disabled={isExporting}
        className={`
          flex items-center justify-center px-4 py-3 rounded-xl font-medium text-sm
          transition-all duration-300 transform-gpu
          ${isExporting 
            ? 'bg-secondary-200 text-secondary-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-success-500 to-success-600 text-white hover:from-success-600 hover:to-success-700 hover:scale-105 hover:shadow-medium active:scale-95'
          }
          focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2
          shadow-soft
        `}
      >
        {isExporting ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-secondary-400 border-t-transparent rounded-full animate-spin mr-2"></div>
            <span>Exporting...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </div>
        )}
      </button>
    </div>
  );
}

export default ExportManager;