import { useState, FormEvent } from 'react';
import { useContactFormStore } from '../useContactFormStore';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { submitLead } from '../../../system/leadSubmission';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactStepInfo() {
  const {
    name, email, phone, company, message,
    isSubmitting,
    setField, prevStep, setSubmitting, setSubmitted, setError
  } = useContactFormStore();

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const validate = (values: { name: string; email: string }) => {
    const errors: Record<string, string> = {};
    if (!values.name.trim()) errors.name = 'Please enter your name';
    if (!values.email.trim()) errors.email = 'Please enter your email';
    else if (!validateEmail(values.email)) errors.email = 'Please enter a valid email address';
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    const errors = validate({ name, email });
    setLocalErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setError(null);

    const storeState = useContactFormStore.getState();
    const result = await submitLead(storeState);

    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  const handleChange = (field: 'name' | 'email' | 'phone' | 'company' | 'message', value: string) => {
    setField(field, value);
    if (touched[field]) {
      const updated = { name, email, [field]: value };
      const errors = validate({ name: updated.name, email: updated.email });
      setLocalErrors(prev => ({ ...prev, [field]: errors[field] || '' }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errors = validate({ name, email });
    setLocalErrors(errors);
  };

  const inputClass = (field: string) =>
    `w-full bg-black/40 rounded-lg px-4 py-2.5 text-white placeholder-white/25 transition-all outline-none border text-sm
    ${touched[field] && localErrors[field]
      ? 'border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500'
      : 'border-white/10 focus:border-[var(--accent-color,#3b82f6)] focus:ring-1 focus:ring-[var(--accent-color,#3b82f6)]'
    } disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={prevStep}
          disabled={isSubmitting}
          className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors disabled:opacity-40"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-white/90">Your Details</h2>
          <p className="text-xs text-white/40 mt-0.5">We'll reach out within 24 hours</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-4 pb-4">

          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-white/70 mb-1.5">
              Name <span className="text-red-400/80">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={e => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder="Alex Johnson"
              disabled={isSubmitting}
              aria-invalid={!!(touched.name && localErrors.name)}
              aria-describedby={touched.name && localErrors.name ? 'name-error' : undefined}
              className={inputClass('name')}
            />
            {touched.name && localErrors.name && (
              <p id="name-error" className="mt-1.5 text-xs text-red-400" aria-live="polite">
                {localErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-white/70 mb-1.5">
              Email <span className="text-red-400/80">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={e => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="alex@company.com"
              disabled={isSubmitting}
              aria-invalid={!!(touched.email && localErrors.email)}
              aria-describedby={touched.email && localErrors.email ? 'email-error' : undefined}
              className={inputClass('email')}
            />
            {touched.email && localErrors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-red-400" aria-live="polite">
                {localErrors.email}
              </p>
            )}
          </div>

          {/* Phone & Company row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-white/70 mb-1.5 flex items-center gap-2">
                Phone
                <span className="text-xs text-white/30 font-normal">Optional</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="+1 555 0000"
                disabled={isSubmitting}
                className={inputClass('phone')}
              />
            </div>
            <div>
              <label htmlFor="contact-company" className="block text-sm font-medium text-white/70 mb-1.5 flex items-center gap-2">
                Company
                <span className="text-xs text-white/30 font-normal">Optional</span>
              </label>
              <input
                id="contact-company"
                type="text"
                value={company}
                onChange={e => handleChange('company', e.target.value)}
                placeholder="Acme Inc."
                disabled={isSubmitting}
                className={inputClass('company')}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-white/70 mb-1.5 flex items-center gap-2">
              Message
              <span className="text-xs text-white/30 font-normal">Optional</span>
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={e => handleChange('message', e.target.value)}
              placeholder="Anything else we should know?"
              disabled={isSubmitting}
              rows={3}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[var(--accent-color,#3b82f6)] focus:ring-1 focus:ring-[var(--accent-color,#3b82f6)] transition-all resize-none disabled:opacity-50"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-white/5 flex-shrink-0">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm tracking-wide bg-[var(--accent-color,#3b82f6)] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(var(--accent-color-rgb,59,130,246),0.25)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending request…
              </>
            ) : (
              'Send my request'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
