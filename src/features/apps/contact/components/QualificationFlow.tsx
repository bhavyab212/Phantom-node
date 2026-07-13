import React, { useState, useEffect } from 'react';
import { useContactFormStore } from '../useContactFormStore';
import { GlassPanel } from '@/features/native-app-shell';
import { cn } from '@/lib/utils';
import { ArrowLeft, Loader2, Info, Send, HelpCircle, Target } from 'lucide-react';
import { getQuestionById } from '../lib/routing-engine';
import { useQuestionHelp } from '../lib/useQuestionHelp';

export const QualificationFlow: React.FC = () => {
  const { 
    sourceType, sourceId, sourceTitle, 
    currentQuestionId, answeredQuestionIds, answers,
    setAnswer, setNextQuestion, prevStep, history,
    consentGranted, setConsent, clearSession
  } = useContactFormStore();
  
  const [loadingNext, setLoadingNext] = useState(false);
  const [customText, setCustomText] = useState('');
  const [showTransparency, setShowTransparency] = useState(false);
  
  const question = currentQuestionId ? getQuestionById(currentQuestionId) : null;
  const currentAnswer = currentQuestionId ? answers[currentQuestionId] : undefined;
  
  const currentDimension = question?.dimension;
  const { record: helpRecord } = useQuestionHelp(currentDimension || currentQuestionId);
  
  // Track flow start and question shown
  useEffect(() => {
    import('../../../../lib/analytics').then(({ trackContactFlowStarted, trackContactQuestionShown }) => {
      // Flow started
      if (history.length === 0 && answeredQuestionIds.length === 0) {
        trackContactFlowStarted(sourceType, sourceId || undefined, sourceTitle || undefined);
      }
      // Question shown
      if (question) {
        trackContactQuestionShown(
          answeredQuestionIds.length + 1,
          sourceType,
          !!question.options?.length,
          'generated', // We don't track generated vs fallback perfectly here, default to generated
          sourceId || undefined
        );
      }
    });
  }, [history.length, answeredQuestionIds.length, sourceType, sourceId, sourceTitle, question?.id, question?.text]);
  
  // Reset custom input when question changes
  useEffect(() => {
    setCustomText('');
  }, [currentQuestionId]);
  
  // Initial load or missing question generation
  useEffect(() => {
    const fetchQuestion = async () => {
      if (!currentQuestionId || question || loadingNext) return;
      
      // It's a dimension ID, but we don't have it in dynamic cache yet.
      const dimensionRaw = currentQuestionId.replace(/^dim-/, '').replace(/-/g, ' ');
      
      setLoadingNext(true);
      await generateAndSetQuestion(dimensionRaw, answeredQuestionIds.length);
      setLoadingNext(false);
    };
    fetchQuestion();
  }, [currentQuestionId, question, loadingNext]);

  const generateAndSetQuestion = async (targetDimension: string, count: number) => {
    const { getNextTargetDimension, getFallbackQuestion, registerDynamicQuestion } = await import('../lib/routing-engine');
    
    // Find the actual dimension string from maps if possible, otherwise use raw
    const actualDimension = getNextTargetDimension(sourceType, sourceId || undefined, count) || targetDimension;
    const fallback = getFallbackQuestion(actualDimension, sourceId || 'direct', sourceTitle || 'Direct');
    
    // Always try AI — consent only controls whether personalization (prior session data) is included
    try {
      const payload = {
        sourceType,
        sourceId: sourceId || 'direct',
        sourceTitle,
        flowStage: count === 0 ? 'start' : count >= 4 ? 'end' : 'mid',
        stepNumber: count + 1,
        maxSteps: 6,
        alreadyCoveredDimensions: answeredQuestionIds.map(id => id.replace(/^dim-/, '').replace(/-/g, ' ')),
        nextTargetDimension: actualDimension,
        // Only include prior answers if consent was granted
        previousAnswers: consentGranted 
          ? Object.entries(answers).map(([k, v]) => ({ 
              question: getQuestionById(k)?.text || k, 
              answer: v 
            }))
          : []
      };
      
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 1500);
      
      const res = await fetch('/api/contact/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      
      window.clearTimeout(timeoutId);
      
      if (res.ok) {
        const data = await res.json();
        if (data.question && data.options) {
          registerDynamicQuestion({
            id: fallback.id,
            sourceId: fallback.sourceId,
            sourceTitle: fallback.sourceTitle,
            text: data.question,
            type: 'select',
            required: true,
            answerMode: 'single-select-or-custom',
            options: data.options.map((o: string) => ({ label: o, value: o })),
            dimension: actualDimension
          });
          setNextQuestion(fallback.id);
          return;
        }
      }
    } catch (e) {
      console.error('AI Generation Failed, using fallback', e);
    }
    
    // Fallback with real options from FALLBACK_TEMPLATES
    registerDynamicQuestion(fallback);
    setNextQuestion(fallback.id);
  };

  const determineNextNode = async (answerValue: string, isCustom: boolean) => {
    if (!currentQuestionId || !question) return;
    
    import('../../../../lib/analytics').then(({ trackContactQuestionAnswered }) => {
      trackContactQuestionAnswered(
        answeredQuestionIds.length + 1,
        sourceType,
        isCustom ? 'custom_typed' : 'predefined_option',
        sourceId || undefined
      );
    });

    setLoadingNext(true);
    setAnswer(currentQuestionId, answerValue, isCustom);
    
    const count = answeredQuestionIds.length + 1; // including the one just answered
    const { getNextTargetDimension } = await import('../lib/routing-engine');
    const nextDim = getNextTargetDimension(sourceType, sourceId || undefined, count);
    
    if (!nextDim) {
      // Reached the end of dimensions map
      setNextQuestion(null, true);
      setLoadingNext(false);
      return;
    }
    
    await generateAndSetQuestion(nextDim, count);
    setLoadingNext(false);
  };

  const handleSelect = (val: string) => {
    determineNextNode(val, false);
  };

  const handleCustomSubmit = () => {
    if (customText.trim()) {
      determineNextNode(customText.trim(), true);
    }
  };

  // Helper for options - filter out any rogue 'Something else' options that might remain from bad AI
  let options = question?.options?.map(opt => typeof opt === 'string' ? { label: opt, value: opt } : opt) || [];
  options = options.filter(o => !o.value.toLowerCase().includes('something else'));


  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 relative pb-12">
      <style dangerouslySetInnerHTML={{ __html: `
        .neo-brutalist-card {
          position: relative;
          background-color: #ffffff;
          border: 3px solid #111827; /* Black border */
          border-radius: 16px;
          box-shadow: 4px 4px 0px #111827;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          padding: 24px 32px;
        }

        .neo-brutalist-card:hover {
          transform: translate(-4px, -4px);
          box-shadow: 8px 8px 0px #facc15, 12px 12px 0px #111827; /* Yellow and black stacked shadow */
          background-color: #fffbeb; /* Very subtle yellow bg on hover */
        }

        .neo-brutalist-card::before {
          content: "";
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(250, 204, 21, 0.3), transparent); /* Yellow tint shine */
          transition: 0.6s;
          left: -100%;
          z-index: 1;
        }

        .neo-brutalist-card:hover::before {
          animation: swipeRight 1.5s infinite;
        }

        @keyframes swipeRight {
          100% { transform: translateX(200%) skew(-45deg); }
        }

        .help-reveal-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .neo-brutalist-card:hover .help-reveal-content {
          max-height: 500px;
          opacity: 1;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 2px dashed #facc15; /* Yellow dashed separator */
        }

        .neo-brutalist-btn {
          background-color: #ffffff;
          border: 2px solid #111827;
          border-radius: 12px;
          box-shadow: 3px 3px 0px #111827;
          transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .neo-brutalist-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0px #facc15, 7px 7px 0px #111827; /* Yellow/black hover shadow */
          background-color: #fef08a; /* Yellow hover bg */
        }
        
        .neo-brutalist-btn.selected {
          background-color: #facc15; /* Yellow selected bg */
          color: #111827;
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0px #111827;
        }
      `}} />

      <div className="flex flex-col gap-4 mb-2">
        <div className="flex items-center justify-between">
          {history.length > 0 ? (
            <button 
              onClick={prevStep}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-400">
              {answeredQuestionIds.length + 1} / {(sourceType === 'automation') ? 5 : 6}
            </span>
          </div>
        </div>
        
        {/* Context Badge */}
        {sourceTitle && (
          <div className="flex items-center gap-2 bg-yellow-400 text-gray-900 border-2 border-gray-900 rounded-lg px-4 py-2 self-start animate-in fade-in slide-in-from-left-4 duration-500 shadow-[2px_2px_0px_#111827]">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse border border-gray-900"></span>
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Discussing:</span>
            <span className="text-sm font-extrabold">{sourceTitle}</span>
          </div>
        )}
        
        {/* Consent & Transparency UI */}
        {history.length === 0 && (
          <div className="bg-white border-2 border-gray-900 p-5 rounded-xl shadow-[4px_4px_0px_#111827] animate-in fade-in slide-in-from-top-4 duration-500 mt-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-lg">✨</span> Make these questions more relevant
                </h3>
                <p className="text-xs text-gray-600 mt-1 max-w-md leading-relaxed font-medium">
                  Allow this page to use your answers and pages opened during this Studio session to improve the next question. This stays on this device unless you submit your brief.
                </p>
                <button 
                  onClick={() => setShowTransparency(!showTransparency)}
                  className="text-xs text-gray-900 hover:bg-yellow-400 mt-3 flex items-center gap-1 font-bold bg-yellow-200 border border-gray-900 px-3 py-1.5 rounded-md transition-colors"
                >
                  <Info className="w-3 h-3" /> How personalization works
                </button>
              </div>
              <div className="flex items-center ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={consentGranted}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 border-2 border-gray-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-gray-900 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-900 after:border-2 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-400"></div>
                </label>
              </div>
            </div>
            {showTransparency && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-xs text-gray-700 border-2 border-gray-900 shadow-inner font-medium">
                <p className="mb-3">Optional personalization uses this Studio session’s answers and pages you open to improve the next question. It stays on this device unless you choose to send your brief.</p>
                <button 
                  onClick={() => {
                    clearSession();
                    setShowTransparency(false);
                  }}
                  className="text-white font-bold bg-gray-900 hover:bg-gray-800 px-3 py-1.5 rounded-md"
                >
                  Clear local session data
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-2 relative overflow-visible min-h-[500px] flex flex-col justify-start z-10">
        
        {loadingNext ? (
          <div className="flex flex-col items-center justify-center h-full gap-5 text-gray-400 mt-20">
            <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
            <p className="text-sm font-bold text-gray-900 animate-pulse uppercase tracking-widest">Analyzing workflow...</p>
          </div>
        ) : question && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col h-full gap-8">
            
            {/* Brutalist Question Interactive Card */}
            <div className="neo-brutalist-card">
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {question.text}
                  </h2>
                  {helpRecord && (
                    <div className="hidden md:flex text-yellow-500 shrink-0">
                      <HelpCircle className="w-6 h-6 opacity-80" />
                    </div>
                  )}
                </div>
                
                {helpRecord && (
                  <div className="help-reveal-content">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-1 flex flex-col gap-3">
                        <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">
                          {helpRecord.hoverTitle || 'Why we ask this'}
                        </h4>
                        <p className="text-[15px] leading-relaxed text-gray-800 font-bold bg-yellow-100 p-2 rounded-md">
                          {helpRecord.about}
                        </p>
                        {helpRecord.detail && (
                          <p className="text-[14px] leading-relaxed text-gray-700 font-medium">
                            {helpRecord.detail}
                          </p>
                        )}
                      </div>
                      
                      {(helpRecord.whatGoodAnswerLooksLike || helpRecord.exampleAnswer) && (
                        <div className="flex-1 bg-white rounded-xl p-5 border-2 border-gray-900 shadow-[4px_4px_0px_#facc15] flex flex-col gap-3">
                          {helpRecord.whatGoodAnswerLooksLike && (
                            <div>
                              <span className="text-[11px] font-black uppercase tracking-widest text-gray-900 flex items-center gap-2 mb-2">
                                <Target className="w-4 h-4 text-yellow-500" />
                                What a useful answer looks like
                              </span>
                              <p className="text-[14px] text-gray-800 font-bold leading-relaxed">
                                {helpRecord.whatGoodAnswerLooksLike}
                              </p>
                            </div>
                          )}
                          {helpRecord.exampleAnswer && (
                            <div className={cn(helpRecord.whatGoodAnswerLooksLike && "mt-1 pt-3 border-t-2 border-gray-900 border-dashed")}>
                              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">
                                Example
                              </span>
                              <p className="text-[14px] text-gray-700 font-medium italic">"{helpRecord.exampleAnswer.replace(/^Example:\s*/i, '').replace(/^"|"$/g, '')}"</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Options */}
            <div className="flex flex-col gap-4 flex-1 pr-2 pb-6">
              {options.map((opt) => {
                const isSelected = currentAnswer === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "neo-brutalist-btn w-full text-left p-5 text-[16px] font-bold outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 focus-visible:ring-offset-2",
                      isSelected ? "selected" : "text-gray-800"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
              
              {/* Permanent Custom Answer Input */}
              <div className="mt-6 pt-6 border-t-2 border-gray-900 border-dashed flex flex-col gap-2 relative">
                <span className="text-xs font-black uppercase tracking-widest text-gray-900 absolute -top-3 bg-yellow-400 px-3 py-0.5 rounded-md border-2 border-gray-900 left-4 shadow-[2px_2px_0px_#111827]">Or type your own</span>
                <div className="flex items-stretch gap-3 mt-2">
                  <textarea
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleCustomSubmit();
                      }
                    }}
                    placeholder="E.g. We need it to integrate with our custom CRM..."
                    className="w-full p-4 bg-white text-gray-900 border-2 border-gray-900 rounded-xl box-shadow-sm focus:ring-4 focus:ring-yellow-200 outline-none resize-none text-[15px] font-bold transition-all shadow-[4px_4px_0px_rgba(17,24,39,0.1)]"
                    rows={2}
                  />
                  <button 
                    onClick={handleCustomSubmit}
                    disabled={!customText.trim()}
                    className="aspect-square w-[72px] flex items-center justify-center bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:shadow-none transition-all neo-brutalist-btn"
                    title="Submit custom answer"
                    style={{ border: customText.trim() ? '2px solid #111827' : '2px solid #d1d5db', boxShadow: customText.trim() ? '4px 4px 0px #111827' : 'none' }}
                  >
                    <Send className="w-6 h-6 stroke-[2.5px]" />
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};
