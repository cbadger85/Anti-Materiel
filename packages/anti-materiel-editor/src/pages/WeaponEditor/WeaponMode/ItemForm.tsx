import React from 'react';
import { useForm } from '../../../hooks/useForm';
import { Input } from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import { getClasses } from '../../../utils/getClasses';
import { isEmpty } from '../../../utils/formValidators';

export const ListItem: React.FC<AvaListItemProps> = ({
  item,
  removeItem,
  id,
}) => {
  return (
    <div className="list-item">
      <span className="list-item__name">{item.name}</span>
      <span className="list-item__wiki-link">
        <a
          href={item.wikiLink}
          title={item.wikiLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.wikiLink}
        </a>
      </span>
      <div className="list-item__delete-button">
        <Button
          id={`${id}-list-item-delete`}
          color="delete-dark"
          onClick={() => removeItem(item.name)}
        >
          <span className="list-item__delete-icon">×</span>
        </Button>
      </div>
    </div>
  );
};

interface AvaListItemProps {
  item: { name: string; wikiLink: string };
  removeItem: (itemName: string) => void;
  id: string;
}

export const ItemForm: React.FC<ItemFormProps> = ({
  addItem,
  removeItem,
  items,
  id,
  placeholder,
  className,
}) => {
  const { fields, onChangeInput, loadFormState } = useForm({
    name: '',
    wikiLink: '',
  });

  const inputWidth = '8rem';

  const handleOnClick = (): void => {
    addItem(fields);
    loadFormState({ name: '', wikiLink: '' });
  };

  return (
    <>
      <h4 className="weapon-mode-item-title">Add {id}</h4>
      <div className={getClasses('add-item__form-container', className)}>
        <div className="item-form__input-row">
          <Input
            id={`weapon-mode-add-${id}-name`}
            label="Name"
            onChange={onChangeInput}
            value={fields.name}
            name="name"
            placeholder={placeholder}
            width={inputWidth}
          />
          <Input
            id={`weapon-mode-add-${id}-wiki-link`}
            label="Wiki Link"
            onChange={onChangeInput}
            value={fields.wikiLink}
            name="wikiLink"
            placeholder="http://infinity..."
            width={inputWidth}
          />
        </div>
        <Button
          color="secondary"
          onClick={handleOnClick}
          disabled={isEmpty(fields.wikiLink) || isEmpty(fields.name)}
          width="100%"
          id={`weapon-mode-add-${id}-button`}
        >
          Add
        </Button>
      </div>
      {!!items.length && (
        <div className="weapon-mode__list-item-container">
          {items.map(item => (
            <ListItem
              key={item.name}
              item={item}
              removeItem={removeItem}
              id={`${item.name}-${id}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

interface ItemFormProps {
  id: 'ammo' | 'traits';
  placeholder: string;
  addItem: (item: { name: string; wikiLink: string }) => void;
  removeItem: (itemName: string) => void;
  items: { name: string; wikiLink: string }[];
  className?: string;
}
