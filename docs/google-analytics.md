# Google Analytics 4 (GA4) Implementation Guide

This document outlines the GA4 instrumentation implemented in the Phantom Node Studio webOS.

## Measurement Details
- **Measurement ID**: `G-XFGTBJFE8C` (Configured via `NEXT_PUBLIC_GA_MEASUREMENT_ID`)

## Core Implementation
- **Script Loading**: Loaded via `@vercel/analytics` inside `AnalyticsConsent` component.
- **Privacy & Consent**: A custom consent banner is displayed to users. GA4 events are only dispatched if `localStorage.getItem('analytics_consent') === 'granted'`.
- **Debug Mode**: Can be enabled via `NEXT_PUBLIC_ANALYTICS_DEBUG=true`.

## Tracked Events & Custom Dimensions

### Navigation Events
- `studio_view_changed`
  - Dimensions: `studio_view`, `previous_studio_view`, `navigation_source`
- `studio_navigation_clicked`
  - Dimensions: `destination_view`, `navigation_source`
- `quick_launch_clicked`
  - Dimensions: `launch_item`, `destination_view`

### Services Events
- `service_card_viewed`
  - Dimensions: `service_id`, `service_name`, `service_category`, `entry_location`
- `service_detail_opened`
  - Dimensions: `service_id`, `service_name`, `entry_location`
- `service_contact_requested`
  - Dimensions: `service_id`, `service_name`, `cta_location`

### Automations Events
- `automation_card_viewed`
  - Dimensions: `automation_id`, `automation_name`, `automation_category`, `gallery_filter`
- `automation_detail_opened`
  - Dimensions: `automation_id`, `automation_name`, `automation_category`, `entry_location`
- `automation_filter_changed`
  - Dimensions: `selected_filter`, `previous_filter`
- `automation_workflow_inspected`
  - Dimensions: `automation_id`, `inspection_action`
- `automation_contact_requested`
  - Dimensions: `automation_id`, `automation_name`, `cta_location`, `destination_view`

### Work / Case Study Events
- `case_study_opened`
  - Dimensions: `case_study_id`, `case_study_name`, `entry_location`
- `case_study_contact_requested`
  - Dimensions: `case_study_id`, `cta_location`

### Contact Flow Events
- `contact_flow_started`
  - Dimensions: `source_type`, `source_id`, `source_title`, `entry_location`
- `contact_question_shown`
  - Dimensions: `question_index`, `source_type`, `question_mode`, `has_options`, `source_id`
- `contact_question_answered`
  - Dimensions: `question_index`, `source_type`, `answer_type`, `source_id`
- `contact_flow_back_clicked`
  - Dimensions: `question_index`, `source_type`
- `contact_flow_completed`
  - Dimensions: `source_type`, `total_questions_answered`, `custom_answer_used`, `completion_mode`, `source_id`
- `contact_brief_submitted`
  - Dimensions: `source_type`, `total_questions_answered`, `has_company_website`, `has_optional_phone`, `submission_status`, `source_id`

### Search Events
- `studio_search_performed`
  - Dimensions: `query_length`, `result_count`, `selected_result_type`, `selected_result_id`

## Verification Checklist
When deploying to production, follow these steps to verify tracking:
1. Load the production site in an incognito window.
2. Accept the analytics consent banner.
3. Open the Network tab in Developer Tools and filter by `collect?v=2` to see GA4 hits.
4. Perform the following user journey:
   - Click a quick launch item (e.g., Explore Services)
   - Open a Service Detail view
   - Click "Contact us about this"
   - Complete the contact qualification flow questions
   - Submit the contact form (dummy data is fine)
   - Perform a global search (Cmd+K or via Start menu) and click a result
5. Verify in the GA4 Realtime dashboard that the events appear with the correct custom dimensions.
