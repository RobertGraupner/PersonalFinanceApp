import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils/cn';

interface LogoutButtonProps {
  isMinimized?: boolean;
  isMobile?: boolean;
}

export function LogoutButton({ isMinimized, isMobile }: LogoutButtonProps) {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: '/login',
          redirect: true,
        })
      }
      className={cn(
        'flex items-center gap-4 text-grey300 transition-colors',
        // Desktop styles
        !isMobile && 'w-fit rounded-lg ps-8',
        !isMobile && isMinimized && 'justify-center px-2',
        // Mobile styles
        isMobile && 'flex-col gap-1'
      )}
      aria-label="Logout"
    >
      <LogOut
        className={cn('shrink-0', isMobile ? 'h-5 w-5' : 'h-6 w-6')}
        aria-hidden="true"
      />
      {(!isMinimized || isMobile) && (
        <span
          className={cn(
            'font-bold',
            isMobile ? 'text-preset-5' : 'text-preset-3 hover:text-white'
          )}
        >
          {isMobile ? '' : 'Logout'}
        </span>
      )}
    </button>
  );
}
