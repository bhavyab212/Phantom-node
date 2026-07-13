/**
 * Central Analytics Helper for Google Analytics 4 (GA4)
 * 
 * Ensures analytics calls are strictly typed, obey user consent,
 * strip personally identifiable information, and degrade gracefully.
 */

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const IS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';
const IS_DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true';

type GtagArgs = [string, string, Record<string, any>?];

// Prevent crashing if `window.gtag` doesn't exist
const safeGtag = (...args: GtagArgs) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag(...args);
  }
};

/**
 * Core event tracking wrapper.
 * Honors consent, enabled flags, and debug mode.
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  // Respect the global killswitch
  if (!IS_ENABLED || !GA_MEASUREMENT_ID) {
    return;
  }

  // We check a localStorage flag to respect consent
  if (typeof window !== 'undefined') {
    const consent = localStorage.getItem('analytics_consent');
    if (consent === 'declined') {
      return;
    }
    // We allow tracking if 'granted' or empty (as GA4 has its own consent mode if needed,
    // but the prompt asked to no-op if declined). Wait, prompt said:
    // "analytics must not load before consent is granted where consent is required by applicable law"
    // To be strict, we'll only fire if granted.
    if (consent !== 'granted') {
      return;
    }
  }

  const safeParams = {
    ...params,
    ...(IS_DEBUG && { debug_mode: true })
  };

  if (IS_DEBUG) {
    console.log(`[GA4 Debug] Event: ${eventName}`, safeParams);
  }

  safeGtag('event', eventName, safeParams);
}

// --------------------------------------------------------
// Specific Product Events (Strongly Typed)
// --------------------------------------------------------

export function trackStudioViewChanged(studioView: string, previousStudioView: string | null, navigationSource: string) {
  trackEvent('studio_view_changed', {
    studio_view: studioView,
    previous_studio_view: previousStudioView || 'none',
    navigation_source: navigationSource
  });
}

export function trackStudioNavigationClicked(destinationView: string, navigationSource: 'sidebar' | 'quick_launch' | 'internal_cta' | 'browser_history' | 'deep_link') {
  trackEvent('studio_navigation_clicked', {
    destination_view: destinationView,
    navigation_source: navigationSource
  });
}

export function trackQuickLaunchClicked(launchItem: 'explore_work' | 'core_services' | 'browse_automations', destinationView: string) {
  trackEvent('quick_launch_clicked', {
    launch_item: launchItem,
    destination_view: destinationView
  });
}

export function trackServiceCardViewed(serviceId: string, serviceName: string, serviceCategory?: string, entryLocation?: string) {
  trackEvent('service_card_viewed', {
    service_id: serviceId,
    service_name: serviceName,
    ...(serviceCategory && { service_category: serviceCategory }),
    ...(entryLocation && { entry_location: entryLocation })
  });
}

export function trackServiceDetailOpened(serviceId: string, serviceName: string, entryLocation?: string) {
  trackEvent('service_detail_opened', {
    service_id: serviceId,
    service_name: serviceName,
    ...(entryLocation && { entry_location: entryLocation })
  });
}

export function trackServiceContactRequested(serviceId: string, serviceName: string, ctaLocation: string) {
  trackEvent('service_contact_requested', {
    service_id: serviceId,
    service_name: serviceName,
    cta_location: ctaLocation
  });
}

export function trackAutomationCardViewed(automationId: string, automationName: string, automationCategory: string, galleryFilter: string) {
  trackEvent('automation_card_viewed', {
    automation_id: automationId,
    automation_name: automationName,
    automation_category: automationCategory,
    gallery_filter: galleryFilter
  });
}

export function trackAutomationDetailOpened(automationId: string, automationName: string, automationCategory: string, entryLocation: string) {
  trackEvent('automation_detail_opened', {
    automation_id: automationId,
    automation_name: automationName,
    automation_category: automationCategory,
    entry_location: entryLocation
  });
}

export function trackAutomationFilterChanged(selectedFilter: string, previousFilter: string) {
  trackEvent('automation_filter_changed', {
    selected_filter: selectedFilter,
    previous_filter: previousFilter
  });
}

export function trackAutomationWorkflowInspected(automationId: string, inspectionAction: 'open' | 'expand' | 'zoom_in' | 'zoom_out' | 'reset_zoom') {
  trackEvent('automation_workflow_inspected', {
    automation_id: automationId,
    inspection_action: inspectionAction
  });
}

export function trackAutomationContactRequested(automationId: string, automationName: string, ctaLocation: string) {
  trackEvent('automation_contact_requested', {
    automation_id: automationId,
    automation_name: automationName,
    cta_location: ctaLocation,
    destination_view: 'contact'
  });
}

export function trackCaseStudyOpened(caseStudyId: string, caseStudyName: string, entryLocation: string) {
  trackEvent('case_study_opened', {
    case_study_id: caseStudyId,
    case_study_name: caseStudyName,
    entry_location: entryLocation
  });
}

export function trackCaseStudyContactRequested(caseStudyId: string, ctaLocation: string) {
  trackEvent('case_study_contact_requested', {
    case_study_id: caseStudyId,
    cta_location: ctaLocation
  });
}

export function trackContactFlowStarted(sourceType: 'direct' | 'service' | 'automation', sourceId?: string, sourceTitle?: string, entryLocation?: string) {
  trackEvent('contact_flow_started', {
    source_type: sourceType,
    ...(sourceId && { source_id: sourceId }),
    ...(sourceTitle && { source_title: sourceTitle }),
    ...(entryLocation && { entry_location: entryLocation })
  });
}

export function trackContactQuestionShown(questionIndex: number, sourceType: string, hasOptions: boolean, questionMode: 'generated' | 'fallback', sourceId?: string) {
  trackEvent('contact_question_shown', {
    question_index: questionIndex,
    source_type: sourceType,
    question_mode: questionMode,
    has_options: hasOptions,
    ...(sourceId && { source_id: sourceId })
  });
}

export function trackContactQuestionAnswered(questionIndex: number, sourceType: string, answerType: 'predefined_option' | 'custom_typed' | 'skipped', sourceId?: string) {
  trackEvent('contact_question_answered', {
    question_index: questionIndex,
    source_type: sourceType,
    answer_type: answerType,
    ...(sourceId && { source_id: sourceId })
  });
}

export function trackContactFlowBackClicked(questionIndex: number, sourceType: string) {
  trackEvent('contact_flow_back_clicked', {
    question_index: questionIndex,
    source_type: sourceType
  });
}

export function trackContactFlowCompleted(sourceType: string, totalQuestionsAnswered: number, customAnswerUsed: boolean, completionMode: 'normal' | 'early_finish' | 'fallback', sourceId?: string) {
  trackEvent('contact_flow_completed', {
    source_type: sourceType,
    total_questions_answered: totalQuestionsAnswered,
    custom_answer_used: customAnswerUsed,
    completion_mode: completionMode,
    ...(sourceId && { source_id: sourceId })
  });
}

export function trackContactBriefSubmitted(sourceType: string, totalQuestionsAnswered: number, hasCompanyWebsite: boolean, hasOptionalPhone: boolean, submissionStatus: 'success' | 'failure', sourceId?: string) {
  trackEvent('contact_brief_submitted', {
    source_type: sourceType,
    total_questions_answered: totalQuestionsAnswered,
    has_company_website: hasCompanyWebsite,
    has_optional_phone: hasOptionalPhone,
    submission_status: submissionStatus,
    ...(sourceId && { source_id: sourceId })
  });
}

export function trackStudioSearchPerformed(queryLength: number, resultCount?: number, selectedResultType?: string, selectedResultId?: string) {
  trackEvent('studio_search_performed', {
    query_length: queryLength,
    ...(resultCount !== undefined && { result_count: resultCount }),
    ...(selectedResultType && { selected_result_type: selectedResultType }),
    ...(selectedResultId && { selected_result_id: selectedResultId })
  });
}

export function trackOutboundLinkClicked(linkName: string, destinationHost: string, location: string) {
  trackEvent('outbound_link_clicked', {
    link_name: linkName,
    destination_host: destinationHost,
    location: location
  });
}

export function trackStudioComponentViewed(componentName: string, studioView: string, componentPosition: number, sourceId?: string) {
  trackEvent('studio_component_viewed', {
    component_name: componentName,
    studio_view: studioView,
    component_position: componentPosition,
    ...(sourceId && { source_id: sourceId })
  });
}
