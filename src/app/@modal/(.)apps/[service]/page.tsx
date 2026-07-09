import { appsRegistry } from '@/config/apps-registry';
import { notFound } from 'next/navigation';
import { Window } from '@/features/window-manager/Window';

export default function AppServiceModal({ params }: { params: { service: string } }) {
  const app = appsRegistry.find((a) => a.id === params.service);
  
  if (!app) {
    notFound();
  }

  return (
    <Window id={app.id} title={app.title}>
      <div>Modal content for {app.title}</div>
    </Window>
  );
}
