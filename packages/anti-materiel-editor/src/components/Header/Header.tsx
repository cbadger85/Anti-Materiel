import React from 'react';
import { Link } from 'react-router-dom';
import antiMaterielLogo from '../../images/anti-materiel.svg';
import { EditorMenu } from '../EditorMenu/EditorMenu';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <>
      <header className="header">
        <div>
          <Link to="/">
            <img
              src={antiMaterielLogo}
              alt="anti-materiel logo"
              className="header-logo"
            />
          </Link>
        </div>
      </header>
      <EditorMenu />
    </>
  );
};
