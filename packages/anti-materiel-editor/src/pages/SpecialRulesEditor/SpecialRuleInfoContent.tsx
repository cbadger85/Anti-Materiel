import { SpecialRule } from '@anti-materiel/types';
import React from 'react';
import './SpecialRuleInfo.scss';

export const SpecialRuleInfoContent: React.FC<SpecialRuleInfoContentProps> = ({
  specialRule,
}) => {
  return (
    <div className="special-rule-info-content__wrapper">
      {specialRule ? (
        <div className="special-rule-info-content-table">
          <div className="special-rule-info-content-table__header">
            <span className="special-rule-info-content-table__column-1">
              Name
            </span>
            <span className="special-rule-info-content-table__column-2">
              Order Type
            </span>
          </div>
          <div className="special-rule-info-content-table__row">
            {specialRule.wikiLink ? (
              <a
                href={specialRule.wikiLink}
                target="_blank"
                rel="noopener noreferrer"
                title={specialRule.wikiLink}
                className="special-rule-info-content-table__column-1"
              >
                {specialRule.name}
              </a>
            ) : (
              <span className="special-rule-info-content-table__column-1">
                {specialRule.name}
              </span>
            )}
            <span className="special-rule-info-content-table__column-2">
              {specialRule.skillType.join(', ')}
            </span>
          </div>
        </div>
      ) : (
        <p className="empty-content">No Special Rule has been added yet...</p>
      )}
    </div>
  );
};

interface SpecialRuleInfoContentProps {
  specialRule?: SpecialRule;
}
