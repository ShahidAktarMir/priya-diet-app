import React, { useState, useCallback } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import Modal from './Modal';
import Button from './Button';
import DietPDF from './DietPdf';
import LoadingSpinner from './LoadingSpinner';
import { useToast } from '../context/ToastContext';

function PdfPreviewModal({ isOpen, onClose, formData }) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const { showSuccess, showError } = useToast();

  const zoomLevels = [25, 50, 75, 100, 150];

  const handleZoomChange = useCallback((level) => {
    setZoomLevel(level);
  }, []);

  // Handle toast notifications based on PDF state changes
  React.useEffect(() => {
    if (pdfLoading) {
      showSuccess('PDF generation started...', { duration: 2000 });
    }
  }, [pdfLoading, showSuccess]);

  React.useEffect(() => {
    if (!pdfLoading && !pdfError) {
      // PDF generation completed successfully
      showSuccess('PDF downloaded successfully! 🎉', { duration: 4000 });
    }
  }, [pdfLoading, pdfError, showSuccess]);

  React.useEffect(() => {
    if (pdfError) {
      showError('Failed to generate PDF. Please try again.', { duration: 5000 });
    }
  }, [pdfError, showError]);

  if (!isOpen) return null;

  const fileName = `${formData.name || 'client'}-diet-plan-${new Date().toISOString().split('T')[0]}.pdf`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Diet Plan Preview"
      size="full"
      className="h-[90vh]"
    >
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-secondary-50 to-primary-50 border-b border-secondary-200">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-secondary-700">Zoom:</span>
            <div className="flex items-center gap-1">
              {zoomLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleZoomChange(level)}
                  className={`
                    px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200
                    ${zoomLevel === level
                      ? 'bg-primary-500 text-white shadow-soft'
                      : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200'
                    }
                  `}
                >
                  {level}%
                </button>
              ))}
            </div>
          </div>

          {/* Download Actions */}
          <div className="flex items-center gap-3">
            {/* PDF Metadata Info */}
            <div className="hidden md:flex items-center gap-2 text-xs text-secondary-600 bg-white px-3 py-2 rounded-lg border border-secondary-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>High Quality • 300 DPI • Professional Format</span>
            </div>

            {/* Download Button */}
            <PDFDownloadLink
              document={<DietPDF data={formData} />}
              fileName={fileName}
              className="inline-block"
            >
              {({ loading, error }) => {
                // Defer state updates to avoid updating during render
                setTimeout(() => {
                  setPdfLoading(loading);
                  setPdfError(!!error);
                }, 0);

                return (
                  <Button
                    variant="success"
                    size="md"
                    disabled={loading}
                    className="min-w-[140px]"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <LoadingSpinner size="sm" color="white" className="mr-2" />
                        <span>Generating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                      </div>
                    )}
                  </Button>
                );
              }}
            </PDFDownloadLink>
          </div>
        </div>

        {/* PDF Preview */}
        <div className="flex-1 bg-secondary-100 p-4 overflow-auto">
          <div 
            className="mx-auto bg-white shadow-large rounded-lg overflow-hidden"
            style={{ 
              width: `${(8.5 * 96 * zoomLevel) / 100}px`, // 8.5 inches at 96 DPI scaled by zoom
              minHeight: `${(11 * 96 * zoomLevel) / 100}px` // 11 inches at 96 DPI scaled by zoom
            }}
          >
            <PDFViewer
              width="100%"
              height={`${(11 * 96 * zoomLevel) / 100}px`}
              showToolbar={false}
              className="border-0"
            >
              <DietPDF data={formData} />
            </PDFViewer>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary-50 to-primary-50 border-t border-secondary-200 text-xs text-secondary-600">
          <div className="flex items-center gap-4">
            <span>📄 A4 Format (210 × 297 mm)</span>
            <span>🎯 Print Ready</span>
            <span>⚡ Real-time Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Created: {new Date().toLocaleDateString()}</span>
            <span>•</span>
            <span>Client: {formData.name || 'Unnamed'}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PdfPreviewModal;