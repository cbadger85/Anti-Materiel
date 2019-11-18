import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Select } from '../Select/Select';
import './MultiSelect.scss';
import { MultiSelectItemContainer } from './MultiSelectItemContainer';
import { getClasses } from '../../utils/getClasses';
import { move } from '../../utils/move';

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

  const handleOnDragEnd = (result: DropResult): void => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const newList = move(list, source.index, destination.index);

    onChange(name, newList, error);
  };

  return (
    <div className={getClasses(className)}>
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
        <MultiSelectItemContainer
          list={list}
          removeListItem={handleRemoveListItem}
        />
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
