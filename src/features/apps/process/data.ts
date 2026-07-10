export interface ProcessStepData {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  activities: string[];
  deliverables: string[];
}

export const PROCESS_STEPS: ProcessStepData[] = [
  {
    id: 'diagnose',
    stepNumber: '01',
    title: 'Diagnose',
    description: 'We map your existing manual workflows to identify bottlenecks, data silos, and exact points of friction. We do not write a single line of code until the business problem is fully understood.',
    activities: [
      'Stakeholder Interviews',
      'Process Mining & Documentation',
      'Tech Stack Audit',
      'ROI Feasibility Analysis'
    ],
    deliverables: [
      'Current-State Process Map',
      'Inefficiency Report',
      'Automation Roadmap & ROI Projection'
    ]
  },
  {
    id: 'design',
    stepNumber: '02',
    title: 'Design',
    description: 'We architect the target-state system. This involves selecting the right integration points, mapping the data schemas, and designing the logic flows that will automate the work.',
    activities: [
      'Data Schema Mapping',
      'API Endpoint Definition',
      'Workflow Logic Design',
      'Security & Compliance Review'
    ],
    deliverables: [
      'Future-State Architecture Diagram',
      'Data Flow Map',
      'Technical Specification Document'
    ]
  },
  {
    id: 'deploy',
    stepNumber: '03',
    title: 'Deploy',
    description: 'We build, test, and launch the automation. Our deployments are silent and zero-downtime. We run the new automated system in parallel with your manual process to verify 100% accuracy before full cutover.',
    activities: [
      'Scripting & Integration',
      'Edge-Case Handling',
      'Parallel Run Testing',
      'User Training'
    ],
    deliverables: [
      'Live Automated Workflows',
      'Standard Operating Procedures (SOPs)',
      'Training Walkthrough Video'
    ]
  },
  {
    id: 'improve',
    stepNumber: '04',
    title: 'Improve',
    description: 'Systems degrade without maintenance. We actively monitor your new automated workflows, resolve API breaks proactively, and optimize for speed and scale as your business grows.',
    activities: [
      '24/7 Error Monitoring',
      'API Version Updates',
      'Performance Optimization',
      'Quarterly Scale Reviews'
    ],
    deliverables: [
      'Live Uptime Dashboard',
      'Monthly Optimization Report',
      'Priority SLA Support'
    ]
  }
];
