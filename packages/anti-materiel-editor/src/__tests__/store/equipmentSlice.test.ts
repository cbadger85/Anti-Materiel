import { Equipment } from '@anti-materiel/types';
import equipmentSlice, {
  addEquipment,
  updateEquipment,
  removeEquipment,
  loadEquipment,
} from '../../store/equipmentSlice';

const equipment1: Equipment = {
  name: 'foo',
  wikiLink: '',
  id: '1234',
};

const equipment2: Equipment = {
  name: 'bar',
  wikiLink: '',
  id: '1234',
};

describe('equipmentSlice', () => {
  describe('addEquipment', () => {
    it('should add a piece of equipment', () => {
      const updatedEquipmentList = equipmentSlice([], {
        type: addEquipment.type,
        payload: equipment1,
      });

      expect(updatedEquipmentList).toEqual([equipment1]);
    });
  });

  describe('updateEqupment', () => {
    it('should update a peice of equipment if it already exists in the list', () => {
      const updatedEquipmentList = equipmentSlice([equipment1], {
        type: updateEquipment.type,
        payload: equipment2,
      });

      expect(updatedEquipmentList).toEqual([equipment2]);
    });

    it('should not update the equipment list if the piece of equipment does not exist', () => {
      const equipment3 = { ...equipment1, id: '5678' };

      const updatedEquipmentList = equipmentSlice([equipment2], {
        type: updateEquipment.type,
        payload: equipment3,
      });

      expect(updatedEquipmentList).toEqual([equipment2]);
    });
  });

  describe('removeEquipment', () => {
    it('should remove the equipment from the list', () => {
      const updatedEquipmentList = equipmentSlice([equipment1], {
        type: removeEquipment.type,
        payload: { id: equipment1.id },
      });

      expect(updatedEquipmentList).toEqual([]);
    });
  });

  describe('loadWeapons', () => {
    it('should replace the state with an array of equipment', () => {
      const equipment3 = { ...equipment1, id: '5678' };

      const updatedEquipmentList = equipmentSlice([], {
        type: loadEquipment.type,
        payload: [equipment2, equipment3],
      });

      expect(updatedEquipmentList).toEqual([equipment2, equipment3]);
    });
  });
});
