import React from 'react';
import { Equipment } from '@anti-materiel/types';

export const EquipmentInfoContent: React.FC<EqupimentInfoContentProps> = ({
  equipment,
}) => {
  return (
    <div className="weapon-info-content__wrapper">
      {equipment ? (
        <div className="weapon-info-content-table">
          <div className="weapon-info-content-table__header">
            <span>Name</span>
          </div>
          <div className="weapon-info-content-table__row">
            {equipment.wikiLink ? (
              <a
                href={equipment.wikiLink}
                target="_blank"
                rel="noopener noreferrer"
                title={equipment.wikiLink}
              >
                {equipment.name}
              </a>
            ) : (
              <span>{equipment.name}</span>
            )}
          </div>
        </div>
      ) : (
        <p className="empty-content">No Equipment Info added yet...</p>
      )}
    </div>
  );
};

interface EqupimentInfoContentProps {
  equipment?: Equipment;
}
