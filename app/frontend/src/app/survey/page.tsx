import { redirect } from 'next/navigation';

export default function SurveyPage() {
  redirect('/engineering?tab=survey');
}
