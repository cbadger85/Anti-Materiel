import React from 'react';
import { WeaponModeData } from './WeaponModeTypes';
import { WeaponRangeBand } from './WeaponModeTypes';
import { Button } from '../../../components/Button/Button';
import { getClasses } from '../../../utils/getClasses';
import { Edit2, X } from 'react-feather';
import { ConfirmModal } from '../../../components/Modal/ConfirmModal';
import { useState } from 'react';
import { color } from '../../../styles/colors';

const rangeBandModifierColor: {
  [key: string]: { bgColor: string; color: string };
} = {
  '-6': { bgColor: 'rgb(178, 0, 0)', color: '#f0f4f8' },
  '-3': { bgColor: 'gold', color: 'inherit' },
  '0': { bgColor: 'dodgerblue', color: '#f0f4f8' },
  '+3': { bgColor: 'limegreen', color: 'inherit' },
  '+6': { bgColor: 'greenyellow', color: 'inherit' },
};

export const WeaponModeRangeBandCell: React.FC<WeaponModeRangeBandCellProps> = ({
  rangeBand,
  className,
}) => {
  if (!rangeBand || !rangeBand.max || !rangeBand.min || !rangeBand.modifier) {
    return <span className={className}>--</span>;
  }

  return (
    <span
      className={className}
      style={{
        backgroundColor: rangeBandModifierColor[rangeBand.modifier].bgColor,
        color: rangeBandModifierColor[rangeBand.modifier].color,
      }}
    >{`${rangeBand.min}-${rangeBand.max}" ${rangeBand.modifier}`}</span>
  );
};

interface WeaponModeRangeBandCellProps {
  rangeBand?: WeaponRangeBand;
  className?: string;
}

export const ItemLink: React.FC<ItemLinkProps> = ({ item, className }) => {
  if (!item.wikiLink) {
    return <span className={className}>{item.name}</span>;
  }

  return (
    <a
      href={item.wikiLink}
      target="_blank"
      rel="noopener noreferrer"
      title={item.wikiLink}
      className={className}
    >
      {item.name}
    </a>
  );
};

interface ItemLinkProps {
  item: { name: string; wikiLink?: string };
  className?: string;
}

export const WeaponModeAmmoCell: React.FC<WeaponModeAmmoCellProps> = ({
  ammo,
  combinedAmmo,
  className,
}) => {
  const AmmoDivider: React.FC<AmmoDividerProps> = ({ isLast, isCombined }) => {
    if (isLast) {
      return null;
    }

    return isCombined ? <>+</> : <>/</>;
  };

  if (!ammo.length) {
    return (
      <div className={getClasses('weapon-mode-table__empty-cell', className)}>
        --
      </div>
    );
  }

  return (
    <div className={className}>
      {ammo.map((ammoType, i) => (
        <span key={ammoType.name}>
          <ItemLink item={ammoType} />
          <AmmoDivider
            isCombined={combinedAmmo}
            isLast={i === ammo.length - 1}
          />
        </span>
      ))}
    </div>
  );
};

interface AmmoDividerProps {
  isLast?: boolean;
  isCombined?: boolean;
}

interface WeaponModeAmmoCellProps {
  ammo: { name: string; wikiLink?: string }[];
  combinedAmmo?: boolean;
  className?: string;
}

export const WeaponModeTraitsCell: React.FC<WeaponModeTraitsCellProps> = ({
  traits,
  className,
}) => {
  const TraitsDivider: React.FC<TraitsDividerProps> = ({ isLast }) => {
    if (isLast) {
      return null;
    }

    return <>, </>;
  };

  if (!traits.length) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      {traits.map((trait, i) => (
        <span key={trait.name}>
          <ItemLink item={trait} />
          <TraitsDivider isLast={i === traits.length - 1} />
        </span>
      ))}
    </div>
  );
};

interface WeaponModeTraitsCellProps {
  traits: { name: string; wikiLink?: string }[];
  className?: string;
}

interface TraitsDividerProps {
  isLast?: boolean;
}

export const WeaponModeContentItem: React.FC<WeaponModeContentItem> = ({
  weaponMode,
  editWeaponMode,
  removeWeaponMode,
}) => {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <div className="weapon-mode-table__row">
      <div className="weapon-mode-table__col-1">{weaponMode.name}</div>
      <div className="weapon-mode-table__col-2">
        <WeaponModeRangeBandCell rangeBand={weaponMode.shortRangeBand} />
        <WeaponModeRangeBandCell rangeBand={weaponMode.mediumRangeBand} />
        <WeaponModeRangeBandCell rangeBand={weaponMode.longRangeBand} />
        <WeaponModeRangeBandCell rangeBand={weaponMode.maximumRangeBand} />
      </div>
      <div className="weapon-mode-table__col-3">{weaponMode.damage}</div>
      <div className="weapon-mode-table__col-4">{weaponMode.burst}</div>
      <WeaponModeAmmoCell
        ammo={weaponMode.ammo}
        combinedAmmo={weaponMode.combinedAmmo}
        className="weapon-mode-table__col-5"
      />
      <WeaponModeTraitsCell
        traits={weaponMode.traits}
        className="weapon-mode-table__col-6"
      />
      <div className="weapon-mode-table__row-edit-delete weapon-mode-table__col-7">
        <Button
          color="delete-light"
          onClick={() => editWeaponMode(weaponMode.id)}
        >
          <Edit2 color={color.neutral[1]} size="1.25rem" />
        </Button>
        <Button color="delete-light" onClick={() => setIsModalShown(true)}>
          <X color={color.supporting.red[7]} size="1.25rem" />
        </Button>
      </div>
      <ConfirmModal
        isShown={isModalShown}
        onConfirm={() => removeWeaponMode(weaponMode.id)}
        onCancel={() => setIsModalShown(false)}
        text="Are you sure you want to delete this mode?"
      />
    </div>
  );
};

interface WeaponModeContentItem {
  weaponMode: WeaponModeData;
  editWeaponMode: (id: string) => void;
  removeWeaponMode: (id: string) => void;
}

export const WeaponModesContent: React.FC<WeaponModeContentProps> = ({
  weaponModes,
  editWeaponMode,
  removeWeaponMode,
}) => {
  return (
    <div className="weapon-mode-content__wrapper">
      {weaponModes.length ? (
        <div className="weapon-mode-table">
          <div className="weapon-mode-table__header">
            <div className="weapon-mode-table__col-1">Name</div>
            <div className="weapon-mode-table__header-range-bands weapon-mode-table__col-2">
              <div className="weapon-mode-table__header-range-label">
                Ranges
              </div>
              <div className="weapon-mode-table__header-range-band-labels">
                <span>Short</span>
                <span>Medium</span>
                <span>Long</span>
                <span>Maximum</span>
              </div>
            </div>
            <div className="weapon-mode-table__col-3">Damage</div>
            <div className="weapon-mode-table__col-4">Burst</div>
            <div className="weapon-mode-table__col-5">Ammo</div>
            <div className="weapon-mode-table__col-6">Traits</div>
            <div className="weapon-mode-table__col-7" />
          </div>
          {weaponModes.map(weaponMode => (
            <WeaponModeContentItem
              key={weaponMode.id}
              weaponMode={weaponMode}
              editWeaponMode={editWeaponMode}
              removeWeaponMode={removeWeaponMode}
            />
          ))}
        </div>
      ) : (
        <p className="empty-content">No Weapon Modes added yet...</p>
      )}
    </div>
  );
};

interface WeaponModeContentProps {
  weaponModes: WeaponModeData[];
  editWeaponMode: (id: string) => void;
  removeWeaponMode: (id: string) => void;
}
