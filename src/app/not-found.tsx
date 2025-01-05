import { ErrorPage } from '@/components/Ui/ErrorPage';

export default function NotFound() {
  return (
    <ErrorPage
      title="404: Page Has Gone Bankrupt!"
      description="Looks like this page has overspent its budget and went missing! Don't worry though, your money is safe - it's just this page that's broken."
      showHomeButton={true}
    />
  );
}
