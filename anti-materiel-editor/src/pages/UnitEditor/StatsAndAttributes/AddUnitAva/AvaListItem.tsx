import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button } from '../../../../components/Button/Button';

export const AvaListItem: React.FC<AvaListItemProps> = ({
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
          <span className="list-item-ava__sectorial">{item.sectorial}</span>
          <span className="list-item-ava__ava">{item.ava}</span>
          <Button
            className="list-item-ava__delete-button"
            id="ava-list-item-delete"
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
