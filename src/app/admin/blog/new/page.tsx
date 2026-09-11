import React from 'react';
import { PostEditor } from '@/components/admin/post-editor';

export const dynamic = 'force-dynamic';

export default function AdminNewBlogPage() {
  return <PostEditor isEditMode={false} />;
}
