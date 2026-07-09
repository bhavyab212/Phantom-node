import { ContactFormData } from '../apps/contact/useContactFormStore';

export async function submitLead(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  // Simulate network latency (600-900ms)
  const delay = Math.floor(Math.random() * 300) + 600;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Log the structured lead data to console for now
      console.log('--- NEW LEAD CAPTURED ---');
      console.log('Intent:', data.intent === 'Other' ? data.customIntentText : data.intent);
      console.log('Budget:', data.budgetRange);
      console.log('Timeline:', data.timeline);
      console.log('Name:', data.name);
      console.log('Email:', data.email);
      console.log('Phone:', data.phone || 'N/A');
      console.log('Company:', data.company || 'N/A');
      console.log('Message:', data.message || 'N/A');
      console.log('-------------------------');

      // TODO: Wire up real API integration here. 
      // Examples:
      // - await fetch('/api/submit-lead', { method: 'POST', body: JSON.stringify(data) });
      // - await supabase.from('leads').insert(data);
      // - await axios.post('webhook-url', data);

      resolve({ success: true, message: 'Request submitted successfully' });
    }, delay);
  });
}
