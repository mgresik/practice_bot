import { getButtons } from './get-buttons.js';

export const getQuestionButtons = question => {
  return getButtons(Object.keys(question.answers).map(a => [a]))
};
