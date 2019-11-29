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
            <h3 className="weapon-info-content__cell weapon-info-content__cell--column-1">
              Name
            </h3>
            <h3 className="weapon-info-content__cell weapon-info-content__cell--column-2">
              Wiki Link
            </h3>
          </div>
          <div className="weapon-info-content-table__row">
            <span className="weapon-info-content__cell weapon-info-content__cell--column-1">
              {weaponInfo.name}
            </span>
            <a
              href={weaponInfo.wikiLink}
              target="_blank"
              rel="noopener noreferrer"
              className="weapon-info-content__cell weapon-info-content__cell--column-2"
            >
              {weaponInfo.wikiLink}
            </a>
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
