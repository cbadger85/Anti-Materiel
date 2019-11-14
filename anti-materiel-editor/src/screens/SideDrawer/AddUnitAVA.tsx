import React from 'react';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';
import { useForm } from '../../hooks/useForm';
import { sectorialSelectOptions } from './addUnitInfoFormOptions';
import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

const AvaListItem: React.FC<AvaListItemProps> = ({
  item,
  removeListItem,
  index,
}) => {
  return (
    <Draggable draggableId={item.sectorial} index={index}>
      {provided => (
        <div
          className="list-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span style={{ flex: 4 }}>{item.sectorial}</span>
          <span style={{ flex: 1, textAlign: 'center' }}>{item.ava}</span>
          <Button
            style={{ flex: 1, textAlign: 'right' }}
            color="delete-dark"
            onClick={() => removeListItem(item)}
          >
            <span className="list-item__delete-icon">×</span>
          </Button>
        </div>
      )}
    </Draggable>
  );
};

interface AvaListItemProps {
  item: { ava: string; sectorial: string };
  index: number;
  removeListItem: (availability: { ava: string; sectorial: string }) => void;
}

export const AddUnitAVA: React.FC<AddUnitAvaProps> = ({
  addUnitAva,
  removeUnitAva,
  updateAvaList,
  ava,
}) => {
  const { onChangeInput, fields } = useForm({
    ava: '',
    sectorial: '',
  });

  const handleAddUnitAva = () => {
    addUnitAva(fields);
    onChangeInput('ava', '');
    onChangeInput('sectorial', '');
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const newAva = [...ava];

    const movedAva = ava.find(item => item.sectorial === draggableId);

    if (!movedAva) {
      return;
    }

    newAva.splice(source.index, 1);
    newAva.splice(destination.index, 0, movedAva);

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
          />
        </div>
        <Button color="secondary" onClick={handleAddUnitAva}>
          Add AVA
        </Button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {!!ava.length && (
          <div className="list-item">
            <span style={{ flex: 4 }}>Sectorial</span>
            <span style={{ flex: 1, textAlign: 'center' }}>AVA</span>
            <span style={{ flex: 1 }} />
          </div>
        )}
        <Droppable
          droppableId="ava-list-container"
          renderClone={(provided, snapshot, rubric) => (
            <div
              className="list-item"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <span style={{ flex: 4 }}>
                {ava[rubric.source.index].sectorial}
              </span>
              <span style={{ flex: 1, textAlign: 'center' }}>
                {ava[rubric.source.index].ava}
              </span>
              <Button
                color="delete-dark"
                style={{ flex: 1, textAlign: 'right' }}
              >
                <span className="list-item__delete-icon">×</span>
              </Button>
            </div>
          )}
        >
          {provided => (
            <div
              className="list-items__container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {ava.map((item, i) => (
                <AvaListItem
                  key={item.sectorial}
                  index={i}
                  item={item}
                  removeListItem={removeUnitAva}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
