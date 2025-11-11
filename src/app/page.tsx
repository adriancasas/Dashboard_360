'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirebase, initiateAnonymousSignIn } from '@/firebase';
import { Bot } from 'lucide-react';

export default function LoginPage() {
  const { auth, user, isUserLoading } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleAnonymousSignIn = () => {
    initiateAnonymousSignIn(auth);
  };

  if (isUserLoading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Bot className="h-8 w-8" />
            </div>
          <CardTitle className="text-2xl font-bold">Welcome to Agent Dashboard</CardTitle>
          <CardDescription>Sign in to manage your agents and projects.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={handleAnonymousSignIn} className="w-full" variant="secondary">
              Sign In Anonymously
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
