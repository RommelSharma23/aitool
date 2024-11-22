// src/app/tool/[id]/error.tsx
'use client';

import { Alert } from '@/components/ui/alert';

export default function Error() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Alert variant="destructive">
        Failed to load tool details. Please try again later.
      </Alert>
    </div>
  );
}