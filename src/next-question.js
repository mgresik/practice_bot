import { start } from './start.js';
import { getQuestionButtons } from './helpers/get-question-buttons.js';
 
export const nextQuestion = (message, sessions, botConfig, bot) => {
  const sessionId = message.chat.id;

  const session = sessions[sessionId];

  if (!session) {
    return start(message, sessions, botConfig, bot);
  }
  
  sessions[sessionId].push(message.text);

  if (!botConfig.answerTree) {
    return 
  }
  
  const nextQuestion = session.reduce((acc, answer) => {
    const treeAnswer = acc.answers[answer];

    if (!treeAnswer) {
      return null;
    }

    return treeAnswer
  }, botConfig.answerTree);

  if (!nextQuestion) {
    return start(message, sessions, botConfig, bot);
  }

  if (nextQuestion.final) {
    bot.sendMessage(
      sessionId,
      botConfig.finalMessageStart + nextQuestion.final + botConfig.finalMessageEnd,
      {
        reply_markup: getButtons([['Начать сначала']])
      }
    );
  } else {
    bot.sendMessage(sessionId, nextQuestion.question, {
      reply_markup: getQuestionButtons(nextQuestion)
    });
  }
};