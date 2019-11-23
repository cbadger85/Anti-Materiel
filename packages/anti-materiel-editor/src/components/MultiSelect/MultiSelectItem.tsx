import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button } from '../Button/Button';

export const MultiSelectItem: React.FC<ListItemProps> = ({
  item,
  removeListItem,
  id,
  index,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className="list-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <span>{item}</span>
          <Button color="delete-dark" onClick={() => removeListItem(item)}>
            <span className="list-item__delete-icon">×</span>
          </Button>
        </div>
      )}
    </Draggable>
  );
};

interface ListItemProps {
  item: string;
  removeListItem: (item: string) => void;
  id: string;
  index: number;
}
