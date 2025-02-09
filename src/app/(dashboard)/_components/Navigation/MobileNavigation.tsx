import { NavItem } from './NavItem';
import { NAVIGATION_ITEMS } from '@/constants/navigation';
import { LogoutButton } from './LogoutButton';
export function MobileNavigation() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-10 flex h-[52px] items-center justify-around rounded-t-[8px] border-beige500/10 bg-grey900 pt-2 xs:h-[74px] md:hidden"
      aria-label="Mobile navigation"
    >
      {NAVIGATION_ITEMS.map((item) => (
        <NavItem key={item.href} {...item} isMobile />
      ))}
      <LogoutButton isMobile />
    </nav>
  );
}
