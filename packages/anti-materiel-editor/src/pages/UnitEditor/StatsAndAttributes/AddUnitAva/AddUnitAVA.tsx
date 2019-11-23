import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Button } from '../../../../components/Button/Button';
import { AddIcon } from '../../../../components/Icons';
import { Input } from '../../../../components/Input/Input';
import { Select } from '../../../../components/Select/Select';
import { useForm } from '../../../../hooks/useForm';
import { sectorialSelectOptions } from '../../UnitInfo/UnitInfoFormOptions';
import './AddUnitAva.scss';
import { AvaListItemContainer } from './AvaListItemContainer';
import { move } from '../../../../utils/move';

export const AddUnitAVA: React.FC<AddUnitAvaProps> = ({
  addUnitAva,
  removeUnitAva,
  updateAvaList,
  ava,
}) => {
  const { onChangeInput, fields, loadFormState } = useForm({
    ava: '',
    sectorial: '',
  });

  const avaRegex = new RegExp(/[1-9]|[tT]/);
  const addButtonDisabled = !fields.ava.trim() || !avaRegex.test(fields.ava);

  const handleAddUnitAva = (): void => {
    addUnitAva(fields);

    loadFormState({
      ava: '',
      sectorial: '',
    });
  };

  const handleOnDragEnd = (result: DropResult): void => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const newAva = move(ava, source.index, destination.index);

    updateAvaList(newAva);
  };

  return (
    <>
      <div className="side-drawer-contents__add-ava-container">
        <div className="side-drawer-contents__add-ava-inputs">
          <Select
            name="sectorial"
            label="Sectorial"
            options={sectorialSelectOptions}
            onChange={onChangeInput}
            selectedValue={fields.sectorial}
          />
          <Input
            name="ava"
            label="AVA"
            onChange={onChangeInput}
            value={fields.ava}
            width="3rem"
            uppercase
            placeholder="T"
            id="add-ava-input"
          />
        </div>
        <Button
          color="secondary"
          onClick={handleAddUnitAva}
          disabled={addButtonDisabled}
          width="100%"
          id="add-unit-ava-button"
        >
          <AddIcon color={addButtonDisabled ? 'disabled' : 'secondary'} />
          <span>Add AVA</span>
        </Button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <AvaListItemContainer ava={ava} removeUnitAva={removeUnitAva} />
      </DragDropContext>
    </>
  );
};

interface AddUnitAvaProps {
  addUnitAva: (availability: { ava: string; sectorial: string }) => void;
  removeUnitAva: (availability: { ava: string; sectorial: string }) => void;
  updateAvaList: (newAva: { ava: string; sectorial: string }[]) => void;
  ava: { ava: string; sectorial: string }[];
}
