import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { getClasses } from '../../utils/getClasses';

export const MenuLink: React.FC<NavLinkProps> = ({
  to,
  children,
  className,
  activeClassName,
  ...props
}) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link
      {...props}
      to={to}
      className={getClasses(className, isActive && activeClassName)}
      onClick={e => isActive && e.preventDefault()}
    >
      {children}
    </Link>
  );
};

interface NavLinkProps extends LinkProps {
  activeClassName?: string;
}
