import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EditorMenu } from '../EditorMenu/EditorMenu';
import './Header.scss';

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const location = useLocation();

  const isActive = location.pathname === '/';

  return (
    <>
      <header className="header">
        {isActive ? (
          <span>
            <h1 className="header__title">{title}</h1>
          </span>
        ) : (
          <Link to="/">
            <h1 className="header__title">{title}</h1>
          </Link>
        )}
      </header>
      <EditorMenu />
    </>
  );
};

interface HeaderProps {
  title: string;
}
