import { SpecialRule } from '@anti-materiel/types';
import specialRulesSlice, {
  addSpecialRule,
  updateSpecialRule,
  removeSpecialRule,
  loadSpecialRules,
} from '../../store/specialRulesSlice';

const specialRule1: SpecialRule = {
  name: 'foo',
  wikiLink: '',
  id: '1234',
  skillType: ['ARO'],
};

const specialRule2: SpecialRule = {
  name: 'bar',
  wikiLink: '',
  id: '1234',
  skillType: ['ARO'],
};

describe('specialRulesSlice', () => {
  describe('addSpecialRule', () => {
    it('should add a special rule', () => {
      const updatedSpecialRulesList = specialRulesSlice([], {
        type: addSpecialRule.type,
        payload: specialRule1,
      });

      expect(updatedSpecialRulesList).toEqual([specialRule1]);
    });
  });

  describe('updateSpecialRule', () => {
    it('should update a special rule if it already exists in the list', () => {
      const updatedSpecialRulesList = specialRulesSlice([specialRule1], {
        type: updateSpecialRule.type,
        payload: specialRule2,
      });

      expect(updatedSpecialRulesList).toEqual([specialRule2]);
    });

    it('should not update the special rule list if the special rule does not exist', () => {
      const specialRule3 = { ...specialRule1, id: '5678' };

      const updatedSpecialRulesList = specialRulesSlice([specialRule2], {
        type: updateSpecialRule.type,
        payload: specialRule3,
      });

      expect(updatedSpecialRulesList).toEqual([specialRule2]);
    });
  });

  describe('removeSpecialRule', () => {
    it('should remove the special rule from the list', () => {
      const updatedSpecialRulesList = specialRulesSlice([specialRule1], {
        type: removeSpecialRule.type,
        payload: { id: specialRule1.id },
      });

      expect(updatedSpecialRulesList).toEqual([]);
    });
  });

  describe('loadSpecialRules', () => {
    it('should replace the state with an array of special rules', () => {
      const specialRule3 = { ...specialRule1, id: '5678' };

      const updatedSpecialRulesList = specialRulesSlice([], {
        type: loadSpecialRules.type,
        payload: [specialRule2, specialRule3],
      });

      expect(updatedSpecialRulesList).toEqual([specialRule2, specialRule3]);
    });
  });
});
