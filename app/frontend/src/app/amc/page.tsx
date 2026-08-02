import { redirect } from 'next/navigation';

export default function AmcPage() {
  redirect('/scada?tab=amc');
}
