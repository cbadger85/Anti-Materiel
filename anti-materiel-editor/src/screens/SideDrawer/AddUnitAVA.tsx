import React from 'react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';
import { useForm } from '../../hooks/useForm';
import { sectorialSelectOptions } from './addUnitInfoFormOptions';

const AvaListItem: React.FC<AvaListItemProps> = ({ item, removeListItem }) => {
  return (
    <div className="list-item">
      <span>{item.sectorial}</span>
      <span>{item.ava}</span>
      <Button color="delete-dark" onClick={() => removeListItem(item)}>
        <span className="list-item__delete-icon">×</span>
      </Button>
    </div>
  );
};

interface AvaListItemProps {
  item: { ava: string; sectorial: string };
  removeListItem: (availability: { ava: string; sectorial: string }) => void;
}

export const AddUnitAVA: React.FC<AddUnitAvaProps> = ({
  addUnitAva,
  removeUnitAva,
  ava,
}) => {
  const { state, onChangeInput, onLoadFormState } = useForm({
    ava: '',
    sectorial: '',
  });

  const handleAddUnitAva = () => {
    addUnitAva(state);
    onLoadFormState({ ava: '', sectorial: '' });
  };

  return (
    <>
      <div className="side-drawer-contents__add-ava-container">
        <div className="side-drawer-contents__add-ava-inputs">
          <Input
            name="ava"
            label="AVA"
            onChange={onChangeInput}
            value={state.ava}
            width="3rem"
          />
          <Select
            name="sectorial"
            label="Sectorial"
            options={sectorialSelectOptions}
            onChange={onChangeInput}
            selectedValue={state.sectorial}
          />
        </div>
        <Button color="secondary" onClick={handleAddUnitAva}>
          Add AVA
        </Button>
      </div>
      <div className="list-items__container">
        {ava.map(item => (
          <AvaListItem
            key={item.sectorial}
            item={item}
            removeListItem={removeUnitAva}
          />
        ))}
      </div>
    </>
  );
};

interface AddUnitAvaProps {
  addUnitAva: (availability: { ava: string; sectorial: string }) => void;
  removeUnitAva: (availability: { ava: string; sectorial: string }) => void;
  ava: { ava: string; sectorial: string }[];
}
