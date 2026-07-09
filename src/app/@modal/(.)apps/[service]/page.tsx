import { appsRegistry } from '@/config/apps-registry';
import { notFound } from 'next/navigation';
import { Window } from '@/features/window-manager/Window';

export default async function AppServiceModal({ params }: { params: Promise<{ service: string }> }) {
  const resolvedParams = await params;
  const app = appsRegistry.find((a) => a.id === resolvedParams.service);
  
  if (!app) {
    notFound();
  }

  return (
    <Window id={app.id} title={app.title}>
      <div>Modal content for {app.title}</div>
    </Window>
  );
}
