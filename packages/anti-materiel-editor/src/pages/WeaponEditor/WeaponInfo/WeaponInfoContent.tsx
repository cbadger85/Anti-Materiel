import React from 'react';
import { WeaponInfoData } from './WeaponInfoTypes';
import './WeaponInfo.scss';

export const WeaponInfoContent: React.FC<WeaponInfoContentProps> = ({
  weaponInfo,
}) => {
  return (
    <div className="weapon-info-content__wrapper">
      {weaponInfo ? (
        <div className="weapon-info-content-table">
          <div className="weapon-info-content-table__header">
            <span>Name</span>
          </div>
          <div className="weapon-info-content-table__row">
            {weaponInfo.wikiLink ? (
              <a
                href={weaponInfo.wikiLink}
                target="_blank"
                rel="noopener noreferrer"
                title={weaponInfo.wikiLink}
              >
                {weaponInfo.name}
              </a>
            ) : (
              <span>{weaponInfo.name}</span>
            )}
          </div>
        </div>
      ) : (
        <p className="empty-content">No Weapon Info added yet...</p>
      )}
    </div>
  );
};

interface WeaponInfoContentProps {
  weaponInfo?: WeaponInfoData;
}
