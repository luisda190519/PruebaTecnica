'use client';

import { AuthFlow } from "@/components/auth";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <AuthFlow />
    </div>
  );
}
