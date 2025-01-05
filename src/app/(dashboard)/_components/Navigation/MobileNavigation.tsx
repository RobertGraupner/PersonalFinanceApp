import { NavItem } from './NavItem';
import { NAVIGATION_ITEMS } from '@/constants/navigation';

export function MobileNavigation() {
  return (
    <nav
      className="xs:h-[74px] fixed bottom-0 left-0 right-0 flex h-[52px] items-center justify-around rounded-t-[8px] border-beige500/10 bg-grey900 pt-2 md:hidden"
      aria-label="Mobile navigation"
    >
      {NAVIGATION_ITEMS.map((item) => (
        <NavItem key={item.href} {...item} isMobile />
      ))}
    </nav>
  );
}
