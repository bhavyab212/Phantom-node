"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { motion, AnimatePresence } from "framer-motion";

export function AnalyticsConsent() {
  const [consentState, setConsentState] = useState<'pending' | 'granted' | 'declined' | null>(null);
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const isEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';

  useEffect(() => {
    // Only run on client
    if (!isEnabled) {
      setConsentState('declined');
      return;
    }

    const storedConsent = localStorage.getItem('analytics_consent');
    if (storedConsent) {
      setConsentState(storedConsent as 'granted' | 'declined');
    } else {
      setConsentState('pending');
    }
  }, [isEnabled]);

  const handleAccept = () => {
    localStorage.setItem('analytics_consent', 'granted');
    setConsentState('granted');
  };

  const handleDecline = () => {
    localStorage.setItem('analytics_consent', 'declined');
    setConsentState('declined');
  };

  if (!isEnabled) return null;

  return (
    <>
      {consentState === 'granted' && gaId && (
        <GoogleAnalytics gaId={gaId} />
      )}

      <AnimatePresence>
        {consentState === 'pending' && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gray-900/90 backdrop-blur-md border border-gray-700 p-4 rounded-xl shadow-2xl z-50 text-sm"
          >
            <h3 className="font-bold text-white mb-2">Analytics preference</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              We use anonymous usage analytics to understand which Studio sections are useful and improve the experience. We do not send contact-form answers or personal details to analytics.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Accept analytics
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Decline
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
