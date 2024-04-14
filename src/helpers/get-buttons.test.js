import { getButtons } from './get-buttons.js';

describe('getButtons', () => {
  it('возвращает правильный объект с кнопками', () => {
    const buttonsMatrix = [
      ['A', 'B'],
      ['C', 'D'],
    ];

    const result = getButtons(buttonsMatrix);

    expect(result).toEqual({
      keyboard: [
        [{ text: 'A' }, { text: 'B' }],
        [{ text: 'C' }, { text: 'D' }],
      ],
      selective: true,
    });
  });
});
