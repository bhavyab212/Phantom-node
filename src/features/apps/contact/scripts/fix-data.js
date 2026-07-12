const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/phantom-node-question-bank.json');

function generateOptions(text) {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('first release') || lowerText.includes('do first') || lowerText.includes('audience')) {
    return ["B2B / Enterprise clients", "Consumers (B2C)", "Internal Team", "Partners or Affiliates"];
  }
  if (lowerText.includes('weakest') || lowerText.includes('problem')) {
    return ["Design feels outdated", "Hard to use or navigate", "Doesn't convert well", "Too slow or buggy"];
  }
  if (lowerText.includes('brand material')) {
    return ["We have a full brand book", "Just a logo and colors", "Starting from scratch"];
  }
  if (lowerText.includes('pages need')) {
    return ["Homepage / Landing Page", "Pricing / Services", "About / Contact", "The entire user flow"];
  }
  if (lowerText.includes('after a visitor shows interest') || lowerText.includes('after a reply')) {
    return ["Send an automated email", "Schedule a sales call", "Direct to checkout", "Provide a custom quote"];
  }
  if (lowerText.includes('devices')) {
    return ["Mobile is most important", "Desktop is most important", "Equal mix of both"];
  }
  if (lowerText.includes('update content without a developer')) {
    return ["Yes, very frequently", "Occasionally", "Rarely or never"];
  }
  if (lowerText.includes('timeline') || lowerText.includes('how soon')) {
    return ["As soon as possible", "Within 2-4 weeks", "This quarter", "Just exploring for now"];
  }
  if (lowerText.includes('budget') || lowerText.includes('invest')) {
    return ["Under $5k", "$5k - $15k", "$15k - $50k", "$50k+"];
  }
  if (lowerText.includes('what are you looking for')) {
    return ["Something very similar to your examples", "A version adapted to our workflow", "A completely custom system", "I want to understand what is possible first"];
  }
  if (lowerText.includes('where would this system be used')) {
    return ["One specific team", "One specific process", "Multiple teams", "Client-facing workflow", "Internal operations"];
  }
  if (lowerText.includes('where are follow-ups currently breaking') || lowerText.includes('breaking')) {
    return ["After first inquiry", "After a sales call", "After a proposal is sent", "When there is no response"];
  }
  if (lowerText.includes('improve first') || lowerText.includes('matters most')) {
    return ["Speed of execution", "Consistency and reliability", "Personalization", "Visibility and tracking"];
  }
  if (lowerText.includes('channel')) {
    return ["Email", "WhatsApp / SMS", "Phone Calls", "CRM tasks"];
  }
  if (lowerText.includes('support volume')) {
    return ["Low but highly repetitive", "Moderate and growing fast", "High and hard to manage", "Mixed request types"];
  }
  if (lowerText.includes('system do first')) {
    return ["Answer common questions automatically", "Route requests to the right person", "Gather issue details upfront", "Reduce response time"];
  }
  if (lowerText.includes('slow down today')) {
    return ["Getting the first response out", "Handling repetitive questions", "Internal routing delays", "Missing context from the user"];
  }
  if (lowerText.includes('main need') || lowerText.includes('goal')) {
    return ["Faster research / output", "Better filtering of noise", "More structured summaries", "Easier signal tracking"];
  }
  if (lowerText.includes('produce')) {
    return ["Brief summaries", "Tagged insights", "Real-time alerts", "Research-ready notes", "Daily digests"];
  }
  if (lowerText.includes('hardest today') || lowerText.includes('biggest challenge')) {
    return ["Too many sources to track", "Too much noise", "Slow manual review", "Missing important updates"];
  }
  if (lowerText.includes('what do you want help with')) {
    return ["Automating repetitive work", "Improving an existing system", "Building a custom internal tool", "AI assistant or agent workflow"];
  }
  if (lowerText.includes('feels slow right now')) {
    return ["Sales or lead handling", "Operations or admin", "Customer support", "Content or marketing"];
  }
  if (lowerText.includes('without a better system')) {
    return ["Too much manual work", "Work gets delayed between tools", "Follow-ups are inconsistent", "Information is scattered"];
  }
  if (lowerText.includes('handling it right now')) {
    return ["Mostly manually", "Spreadsheets and copy-paste", "Several disconnected tools", "One system that no longer fits"];
  }
  if (lowerText.includes('good result look like')) {
    return ["Save team time each week", "Fewer missed steps", "Faster response time", "Better visibility across the workflow"];
  }

  // Generic fallback that actually makes sense for an agency context
  return [
    "To save time and automate manual work",
    "To improve customer experience",
    "To scale our operations",
    "To gain better insights or visibility"
  ];
}

try {
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(rawData);

  let modifiedCount = 0;

  data.questions.forEach(q => {
    // If it has the generic bad options, replace them
    if (q.options && q.options.includes("This is the main issue")) {
      q.options = generateOptions(q.text);
      modifiedCount++;
    } else if (q.options && q.options.includes("Something else (type your own)")) {
      // Remove the explicit 'Something else' option since the UI handles it now
      q.options = q.options.filter(o => o !== "Something else (type your own)");
      modifiedCount++;
    }
  });

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log(`Successfully fixed options for ${modifiedCount} questions.`);
} catch (error) {
  console.error("Error modifying data file:", error);
}
