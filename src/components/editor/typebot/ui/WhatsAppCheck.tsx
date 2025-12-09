'use client';

import { cn } from '@/lib/utils';

export const WhatsAppCheck = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 16 15" width="16" height="15" className={cn("text-blue-400", className)}>
        <path fill="currentColor" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.516.002l-.41.383a.365.365 0 0 0 .003.512l3.238 3.238a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
        <path fill="currentColor" d="M15.263 3.316l-.478-.372a.365.365 0 0 0-.51.063l-6.272 8.048a.32.32 0 0 1-.484.033l-.78-.78a.365.365 0 0 0-.513.512l1.218 1.218a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
    </svg>
);
