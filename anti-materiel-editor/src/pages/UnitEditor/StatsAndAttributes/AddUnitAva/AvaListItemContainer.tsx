import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button } from '../../../../components/Button/Button';
import { AvaListItem } from './AvaListItem';

export const AvaListItemContainer: React.FC<AvaListItemContainerProps> = ({
  ava,
  removeUnitAva,
}) => {
  return (
    <>
      {!!ava.length && (
        <div className="list-item list-item-header">
          <span className="list-item-ava__sectorial">Sectorial</span>
          <span className="list-item-ava__ava">AVA</span>
          <span className="list-item-ava__delete-button" />
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
            <span className="list-item-ava__sectorial">
              {ava[rubric.source.index].sectorial}
            </span>
            <span className="list-item-ava__ava">
              {ava[rubric.source.index].ava}
            </span>
            <Button
              color="delete-dark"
              className="list-item-ava__delete-button"
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
    </>
  );
};

interface AvaListItemContainerProps {
  ava: { ava: string; sectorial: string }[];
  removeUnitAva: (availability: { ava: string; sectorial: string }) => void;
}
