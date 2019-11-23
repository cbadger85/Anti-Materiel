import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EditorMenu } from '../EditorMenu/EditorMenu';
import './Header.scss';
import antiMaterielLogo from '../../images/anti-materiel.svg';

export const Header: React.FC = () => {
  const location = useLocation();

  const isActive = location.pathname === '/';

  return (
    <>
      <header className="header">
        <div>
          {isActive ? (
            <span>
              <img
                src={antiMaterielLogo}
                alt="anti-materiel logo"
                className="header-logo"
              />
            </span>
          ) : (
            <Link to="/">
              <img
                src={antiMaterielLogo}
                alt="anti-materiel logo"
                className="header-logo"
              />
            </Link>
          )}
        </div>
      </header>
      <EditorMenu />
    </>
  );
};
