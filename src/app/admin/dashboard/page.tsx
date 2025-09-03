
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

export default function AdminDashboardPage() {
  return (
    <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold">
            Welcome to the Admin Dashboard
        </h1>
        <p className="mt-4 text-muted-foreground">
            This is a placeholder for your main dashboard content. We will build this out in the next steps.
        </p>
    </div>
  );
}
