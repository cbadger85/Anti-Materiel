import React, { useEffect } from 'react';
import { Button } from '../Button/Button';
import { Select } from '../Select/Select';
import './MultiSelect.scss';

const ListItem: React.FC<ListItemProps> = ({ item, removeListItem }) => {
  return (
    <div className="list-item">
      <span>{item}</span>
      <Button color="delete-dark" onClick={() => removeListItem(item)}>
        <span className="list-item__delete-icon">×</span>
      </Button>
    </div>
  );
};

interface ListItemProps {
  item: string;
  removeListItem: (item: string) => void;
}

export const MultiSelect: React.FC<MultiSelectInputProps> = ({
  name,
  label,
  options,
  onChange,
  error,
  list,
  id,
}) => {
  useEffect(() => {
    onChange(name, list, error);
  });

  const handleOnChange = (name: string, value: string): void => {
    if (list.includes(value)) {
      onChange(name, list, error);
      return;
    }

    onChange(name, [...list, value]);
  };

  const handleRemoveListItem = (listItem: string): void => {
    const updatedList = list.filter(item => item !== listItem);

    onChange(name, updatedList);
  };

  return (
    <div>
      <Select
        name={name}
        id={id}
        label={label}
        options={options}
        value={{ label: 'Select...', value: '' }}
        onChange={handleOnChange}
        error={error}
      />
      {list.length > 0 && (
        <div className="list-items__container">
          {list.map(listItem => (
            <ListItem
              key={listItem}
              item={listItem}
              removeListItem={handleRemoveListItem}
            />
          ))}
        </div>
      )}
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
  // fieldState: { value: FormValue; isInvalid?: boolean };
  list: string[];
  error?: boolean;
}
