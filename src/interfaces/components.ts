export interface LayoutProps {
  children: React.ReactNode;
}

export interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export interface CustomIconBtnProps {
  title: string;
  icon: React.ReactElement;
  onClick?: () => void;
}

export interface SVGCardProps {
  title: string;
  svg: string;
  url: string;
}
