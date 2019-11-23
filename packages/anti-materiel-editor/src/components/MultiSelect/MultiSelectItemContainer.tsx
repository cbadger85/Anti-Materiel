import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button } from '../Button/Button';
import { MultiSelectItem } from './MultiSelectItem';

export const MultiSelectItemContainer: React.FC<MultiSelectItemContainerProps> = ({
  list,
  removeListItem,
}) => {
  return (
    <Droppable
      droppableId="multi-select-list"
      renderClone={(provided, snapshot, rubric) => (
        <div
          className="list-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <span>{list[rubric.source.index]}</span>
          <Button color="delete-dark">
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
          {list.map((listItem, i) => (
            <MultiSelectItem
              key={listItem}
              id={listItem}
              index={i}
              item={listItem}
              removeListItem={removeListItem}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

interface MultiSelectItemContainerProps {
  list: string[];
  removeListItem: (listItem: string) => void;
}
