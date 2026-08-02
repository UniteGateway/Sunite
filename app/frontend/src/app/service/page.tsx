import { redirect } from 'next/navigation';

export default function ServicePage() {
  redirect('/scada?tab=service');
}
