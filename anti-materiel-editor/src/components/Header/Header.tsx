import React from 'react';
import './Header.scss';
import { EditorMenu } from '../EditorMenu/EditorMenu';

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
      <EditorMenu />
    </header>
  );
};

interface HeaderProps {
  title: string;
}
