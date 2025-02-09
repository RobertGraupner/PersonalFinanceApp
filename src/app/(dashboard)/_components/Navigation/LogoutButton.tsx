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
        'flex items-center text-grey300 transition-colors',
        // Desktop styles
        !isMobile && 'w-fit gap-4 rounded-lg ps-8',
        !isMobile && isMinimized && 'justify-center px-2',
        // Mobile styles
        isMobile &&
          'relative flex h-[44px] w-16 flex-col items-center gap-2 rounded-t-[8px] pt-2 xs:h-[66px] xs:w-28'
      )}
      aria-label="Logout"
    >
      <div className={cn(isMobile && 'h-6')}>
        <LogOut
          className={cn('shrink-0', isMobile ? 'h-5 w-5' : 'h-6 w-6')}
          aria-hidden="true"
        />
      </div>
      {(!isMinimized || isMobile) && (
        <span
          className={cn(
            'font-bold',
            isMobile
              ? 'hidden text-preset-5 xs:block'
              : 'text-preset-3 hover:text-white'
          )}
        >
          Logout
        </span>
      )}
    </button>
  );
}
