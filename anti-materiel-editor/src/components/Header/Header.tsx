import React from 'react';
import './Header.scss';

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
      <h2 className="header__subtitle">{subtitle}</h2>
    </header>
  );
};

interface HeaderProps {
  title: string;
  subtitle: string;
}
