import { redirect } from 'next/navigation';

export default function ProcurementPage() {
  redirect('/projects?tab=procurement');
}
