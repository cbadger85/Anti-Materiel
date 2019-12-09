import React, { useState } from 'react';
import { Equipment } from '@anti-materiel/types';
import { ManagedContent } from '../../components/ManagedContent/ManagedContent';
import { EquipmentInfoForm } from './EquipmentInfoForm';

export const EquipmentInfo: React.FC<EquipmentInfoProps> = ({
  equipment,
  addEquipment,
}) => {
  const [warn, setWarn] = useState(false);

  return (
    <ManagedContent
      edit={!!equipment}
      warn={warn}
      title="Equipment"
      content={() => null}
      form={(closeSideDrawer, onCancel) => (
        <EquipmentInfoForm
          onCancel={onCancel}
          onSubmit={data => {
            addEquipment(data);
            closeSideDrawer();
          }}
          onDataChange={setWarn}
          initialData={equipment}
        />
      )}
    />
  );
};

interface EquipmentInfoProps {
  equipment?: Equipment;
  addEquipment: (data: Equipment) => void;
}
