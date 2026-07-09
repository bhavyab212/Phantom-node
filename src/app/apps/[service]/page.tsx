import { appsRegistry } from '@/config/apps-registry';
import { notFound } from 'next/navigation';

export function generateMetadata({ params }: { params: { service: string } }) {
  const app = appsRegistry.find((a) => a.id === params.service);
  if (!app) return {};
  
  return {
    title: `${app.title} | Agency WebOS`,
    description: `Details and services for ${app.title}`,
  };
}

export default function AppServicePage({ params }: { params: { service: string } }) {
  const app = appsRegistry.find((a) => a.id === params.service);
  
  if (!app) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-mono mb-4">{app.title}</h1>
      <p>Standalone page for {app.title}.</p>
    </div>
  );
}
