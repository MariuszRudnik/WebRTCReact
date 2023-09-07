import { CALL_SET_SCREEN_SHARING_ACTIVE, setScreenSharingActive } from './callActions.ts';

describe('setScreenSharingActive_function', () => {
  // Tests that the function returns an object with the correct type and active value when passed a boolean true
  it('test_true_active', () => {
    const result = setScreenSharingActive(true);
    expect(result).toEqual({
      type: CALL_SET_SCREEN_SHARING_ACTIVE,
      active: true
    });
  });

  // Tests that the function returns an object with the correct type and active value when passed a boolean false
  it('test_false_active', () => {
    const result = setScreenSharingActive(false);
    expect(result).toEqual({
      type: CALL_SET_SCREEN_SHARING_ACTIVE,
      active: false
    });
  });

  // Assuming the function should handle undefined and null, you might need to adjust the function definition
  // If not, these tests should be removed or adjusted accordingly

  // Tests that the function returns an object with the correct type and active value when passed a boolean true and additional properties
  it('test_additional_properties_true', () => {
    const result = setScreenSharingActive(true);
    expect(result).toEqual({
      type: CALL_SET_SCREEN_SHARING_ACTIVE,
      active: true
    });
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('active');
  });

  // Tests that the function returns an object with the correct type and active value when passed a boolean false and additional properties
  it('test_additional_properties_false', () => {
    const result = setScreenSharingActive(false);
    expect(result).toEqual({
      type: CALL_SET_SCREEN_SHARING_ACTIVE,
      active: false
    });
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('active');
  });
});
