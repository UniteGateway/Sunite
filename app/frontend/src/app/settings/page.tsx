import { redirect } from 'next/navigation';

export default function SettingsPage() {
  redirect('/saas?tab=settings');
}
