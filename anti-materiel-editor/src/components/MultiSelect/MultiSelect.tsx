import React, { useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { Button } from '../Button/Button';
import { Select } from '../Select/Select';
import './MultiSelect.scss';

const ListItem: React.FC<ListItemProps> = ({
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

export const MultiSelect: React.FC<MultiSelectInputProps> = ({
  name,
  label,
  options,
  onChange,
  error,
  list,
  id,
  className,
}) => {
  useEffect(() => {
    onChange(name, list, error);
  });

  const handleOnChange = (name: string, value: string): void => {
    if (list.includes(value)) {
      onChange(name, list, error);
      return;
    }

    onChange(name, [...list, value], error);
  };

  const handleRemoveListItem = (listItem: string): void => {
    const updatedList = list.filter(item => item !== listItem);

    onChange(name, updatedList);
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const newList = [...list];

    newList.splice(source.index, 1);
    newList.splice(destination.index, 0, draggableId);

    onChange(name, newList, error);
  };

  return (
    <div className={className}>
      <Select
        name={name}
        id={id}
        label={label}
        options={options}
        value={{ label: 'Select...', value: '' }}
        onChange={handleOnChange}
        error={error}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {list.length > 0 && (
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
                  <ListItem
                    key={listItem}
                    id={listItem}
                    index={i}
                    item={listItem}
                    removeListItem={handleRemoveListItem}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </div>
  );
};

interface MultiSelectInputProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  onChange: (
    name: string,
    selectedValue: string[],
    isInvalid?: boolean,
  ) => void;
  id?: string;
  list: string[];
  error?: boolean;
  className?: string;
}
