import { appsRegistry } from '@/config/apps-registry';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const app = appsRegistry.find((a) => a.id === resolvedParams.service);
  if (!app) return {};
  
  return {
    title: `${app.title} | Agency WebOS`,
    description: `Details and services for ${app.title}`,
  };
}

export default async function AppServicePage({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const app = appsRegistry.find((a) => a.id === resolvedParams.service);
  
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
