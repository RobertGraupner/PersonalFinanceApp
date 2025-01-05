export type NavigationItem = {
  label: string;
  href: string;
  icon: string;
};

export interface NavigationProps {
  isMinimized: boolean;
  onMinimize: () => void;
}

export interface NavItemProps {
  href: string;
  icon: string;
  label: string;
  className?: string;
  isMinimized?: boolean;
  isMobile?: boolean;
}

export interface MinimizeButtonProps {
  isMinimized: boolean;
  onMinimize: () => void;
}
