import { getQuestionButtons } from './get-question-buttons.js'; 

describe('getQuestionButtons', () => {
  it('возвращает массив кнопок на основе вопроса', () => {
    const question = {
      answers: {
        a: 'Ответ A',
        b: 'Ответ B',
        c: 'Ответ C',
      },
    };

    const result = getQuestionButtons(question);

    expect(result).toEqual({"keyboard": [[{"text": "a"}], [{"text": "b"}], [{"text": "c"}]], "selective": true});
  });
});
