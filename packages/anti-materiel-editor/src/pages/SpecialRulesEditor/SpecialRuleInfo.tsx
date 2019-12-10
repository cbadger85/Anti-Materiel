import React, { useState } from 'react';
import { ManagedContent } from '../../components/ManagedContent/ManagedContent';
import { SpecialRuleInfoForm } from './SpecialRuleInfoForm';
import { SpecialRule } from '@anti-materiel/types';
import { SpecialRuleInfoContent } from './SpecialRuleInfoContent';

export const SpecialRuleInfo: React.FC<SpecialRulesInfoProps> = ({
  specialRule,
  addSpecialRule,
}) => {
  const [warn, setWarn] = useState(false);

  return (
    <ManagedContent
      edit={!!specialRule}
      warn={warn}
      title="Special Rule"
      content={() => <SpecialRuleInfoContent specialRule={specialRule} />}
      form={(closeSideDrawer, onCancel) => (
        <SpecialRuleInfoForm
          onCancel={onCancel}
          onSubmit={data => {
            addSpecialRule(data);
            closeSideDrawer();
          }}
          onDataChange={setWarn}
          initialData={specialRule}
        />
      )}
    />
  );
};

interface SpecialRulesInfoProps {
  specialRule?: SpecialRule;
  addSpecialRule: (data: SpecialRule) => void;
}
