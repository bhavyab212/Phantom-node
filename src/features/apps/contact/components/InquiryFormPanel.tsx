import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { GlassPanel } from '@/features/native-app-shell';
import { NativeFormField } from './NativeFormField';
import { SubmitDial, SubmitState } from './SubmitDial';
import { ResponsePromiseCard } from './ResponsePromiseCard';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { useContactFormStore } from '../useContactFormStore';
import { getQuestionById } from '../lib/routing-engine';

export interface InquiryFormPanelProps {
  className?: string;
}

export const InquiryFormPanel: React.FC<InquiryFormPanelProps> = ({ className }) => {
  const { 
    name, email, company, message, website, phone,
    setField, isSubmitting, setSubmitting,
    sourceType, sourceId, sourceTitle,
    answers, answeredQuestionIds, prevStep
  } = useContactFormStore();
  
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errors, setErrors] = useState<{name?: string; email?: string; company?: string; message?: string}>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Required';
    if (!email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid email required';
    }
    if (!company.trim()) newErrors.company = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateSummary = () => {
    const parts: string[] = [];
    if (sourceTitle) {
      parts.push(`${sourceTitle} enquiry.`);
    } else {
      parts.push(`General enquiry.`);
    }
    const answerValues = answeredQuestionIds.map(id => answers[id]).filter(Boolean);
    if (answerValues.length > 0) {
      parts.push(`Key context: ${answerValues.join(', ')}.`);
    }
    return parts.join(' ');
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    setSubmitState('sending');
    setSubmitting(true);
    
    const payload = {
      contactDetails: { name, email, phone, company, website, message },
      qualification: { 
        sourceType, 
        sourceId, 
        sourceTitle,
        answers: answeredQuestionIds.map(id => ({
          questionId: id,
          prompt: getQuestionById(id)?.text || id,
          answer: answers[id]
        })),
        summary: generateSummary()
      }
    };
    
    // In a real app, this is where we'd send the payload to an API:
    console.log('Submitting payload:', payload);
    
    // Simulate async submission
    setTimeout(() => {
      setSubmitState('success');
      setSubmitting(false);
    }, 1500);
  };

  const getMessagePlaceholder = () => {
    if (sourceType === 'automation') return "Anything specific you want changed, adapted, or added to this automation?";
    if (sourceType === 'service') return "Anything about your current setup, workflow, or goals we should understand?";
    return "Anything else about the workflow, bottleneck, or system you want us to know?";
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto flex flex-col gap-8 relative", className)}>
      
      <GlassPanel elevation="high" tint="light" className="p-8 md:p-12 relative overflow-hidden min-h-[500px]">
        
        {/* State 1: The Form */}
        <div 
          className={cn(
            "flex flex-col gap-6 transition-all duration-500",
            submitState === 'success' ? "opacity-0 pointer-events-none scale-95 absolute" : "opacity-100 scale-100 relative"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={prevStep}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Let's talk systems.
            </h2>
            <p className="text-gray-600 text-sm font-medium">
              We have everything we need to start. Where should we reach you?
            </p>
          </div>

          {/* Qualification Summary Block */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mt-2 shadow-inner">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              What you're looking for
            </h3>
            {sourceTitle && (
              <div className="mb-4 pb-4 border-b border-gray-200">
                <span className="inline-block bg-yellow-100 text-yellow-800 text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1">
                  {sourceType === 'automation' ? 'Automation' : 'Service'}
                </span>
                <p className="font-semibold text-gray-900">{sourceTitle}</p>
              </div>
            )}
            <ul className="space-y-3">
              {answeredQuestionIds.map((id) => {
                const question = getQuestionById(id);
                const answer = answers[id];
                if (!question || !answer) return null;
                return (
                  <li key={id} className="text-sm">
                    <span className="block text-gray-500 mb-0.5">{question.text}</span>
                    <span className="font-semibold text-gray-900">{answer}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <NativeFormField 
              label="Full Name" 
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => {setField('name', e.target.value); setErrors(prev => ({...prev, name: undefined}))}}
              error={errors.name}
            />
            <NativeFormField 
              label="Work Email" 
              placeholder="jane@company.com"
              type="email"
              value={email}
              onChange={(e) => {setField('email', e.target.value); setErrors(prev => ({...prev, email: undefined}))}}
              error={errors.email}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NativeFormField 
              label="Company Name" 
              placeholder="Apex Innovations"
              value={company}
              onChange={(e) => {setField('company', e.target.value); setErrors(prev => ({...prev, company: undefined}))}}
              error={errors.company}
            />
            <NativeFormField 
              label="Website" 
              placeholder="apex.com"
              value={website}
              onChange={(e) => {setField('website', e.target.value)}}
            />
          </div>
          
          <NativeFormField 
            label="Phone/WhatsApp (Optional)" 
            placeholder="+1 234 567 8900"
            value={phone}
            onChange={(e) => {setField('phone', e.target.value)}}
          />

          <NativeFormField 
            label="What should we know before we reply?" 
            placeholder={getMessagePlaceholder()}
            isTextarea
            value={message}
            onChange={(e) => {setField('message', e.target.value); setErrors(prev => ({...prev, message: undefined}))}}
            error={errors.message}
          />

          <div className="flex flex-col sm:flex-row items-center justify-end gap-6 mt-8 pt-6 border-t border-gray-200">
            <SubmitDial status={submitState} onClick={handleSubmit} />
          </div>
        </div>

        {/* State 2: Success Message */}
        <div 
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-12 text-center transition-all duration-500 delay-300",
            submitState === 'success' ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          )}
        >
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
            Inquiry Received
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-sm">
            Thank you, {name.split(' ')[0] || 'there'}. We have your workflow details and will reach out to <span className="font-semibold text-gray-900">{email}</span> shortly.
          </p>
        </div>

      </GlassPanel>

      {/* Trust builder - gracefully fades out on success */}
      <div className={cn(
        "transition-opacity duration-500 max-w-sm mx-auto w-full",
        submitState === 'success' ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <ResponsePromiseCard />
      </div>

    </div>
  );
};
