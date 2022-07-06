export interface LayoutProps {
  children: React.ReactNode;
}

export interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  font?: string;
  mr?: string;
  ml?: string;
}

export interface CustomIconBtnProps {
  title: string;
  icon: React.ReactElement;
  mr?: string;
  ml?: string;
  onClick?: () => void;
}

export interface SVGCardProps {
  id: number;
  svg: string;
  title: string;
  slug?: string;
  url?: string;
}

export interface SidebarContentProps {
  display?: object;
  w?: string;
  borderRight?: string;
  children?: React.ReactNode;
}

export interface LoadingProps {
  text: string;
}

export interface ErrorProps {
  title: string;
  description: string;
}
