import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { GlassPanel } from '@/features/native-app-shell';
import { NativeFormField } from './NativeFormField';
import { SubmitDial, SubmitState } from './SubmitDial';
import { ResponsePromiseCard } from './ResponsePromiseCard';
import { CheckCircle2 } from 'lucide-react';

export interface InquiryFormPanelProps {
  className?: string;
}

export const InquiryFormPanel: React.FC<InquiryFormPanelProps> = ({ className }) => {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [problem, setProblem] = useState('');
  
  // Errors
  const [errors, setErrors] = useState<{name?: string; email?: string; company?: string; problem?: string}>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Required';
    if (!email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid email required';
    }
    if (!company.trim()) newErrors.company = 'Required';
    if (!problem.trim()) newErrors.problem = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    setSubmitState('sending');
    
    // Simulate async submission
    setTimeout(() => {
      setSubmitState('success');
    }, 1500);
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto flex flex-col gap-8 relative", className)}>
      
      {/* 
        We use a wrapper to keep the form and success state in the same physical space 
        and crossfade between them.
      */}
      <GlassPanel elevation="high" tint="light" className="p-8 md:p-12 relative overflow-hidden min-h-[500px]">
        
        {/* State 1: The Form */}
        <div 
          className={cn(
            "flex flex-col gap-6 transition-all duration-500",
            submitState === 'success' ? "opacity-0 pointer-events-none scale-95 absolute" : "opacity-100 scale-100 relative"
          )}
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Let's talk systems.
            </h2>
            <p className="text-gray-600 text-sm font-medium">
              Tell us what's slowing you down. We'll tell you how to fix it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <NativeFormField 
              label="Full Name" 
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => {setName(e.target.value); setErrors(prev => ({...prev, name: undefined}))}}
              error={errors.name}
            />
            <NativeFormField 
              label="Work Email" 
              placeholder="jane@company.com"
              type="email"
              value={email}
              onChange={(e) => {setEmail(e.target.value); setErrors(prev => ({...prev, email: undefined}))}}
              error={errors.email}
            />
          </div>

          <NativeFormField 
            label="Company Name" 
            placeholder="Apex Innovations"
            value={company}
            onChange={(e) => {setCompany(e.target.value); setErrors(prev => ({...prev, company: undefined}))}}
            error={errors.company}
          />

          <NativeFormField 
            label="What takes too much manual work today?" 
            placeholder="We spend hours moving data from Stripe to Salesforce every week..."
            isTextarea
            value={problem}
            onChange={(e) => {setProblem(e.target.value); setErrors(prev => ({...prev, problem: undefined}))}}
            error={errors.problem}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8 pt-6 border-t border-gray-200">
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
            Thank you, {name.split(' ')[0] || 'there'}. We are reviewing your systems friction and will respond to <span className="font-semibold text-gray-900">{email}</span> within one business day.
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
