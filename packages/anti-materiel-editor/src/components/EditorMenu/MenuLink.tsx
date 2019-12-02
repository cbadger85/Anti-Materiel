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

  const isActive = location.pathname.includes(to.toString());

  return (
    <Link
      {...props}
      to={to}
      className={getClasses(className, isActive && activeClassName)}
      onClick={e => location.pathname === to && e.preventDefault()}
    >
      {children}
    </Link>
  );
};

interface NavLinkProps extends LinkProps {
  activeClassName?: string;
}
