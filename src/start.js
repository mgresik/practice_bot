import { getQuestionButtons } from './helpers/get-question-buttons.js';

export const start = (message, sessions, botConfig) => {
  const sessionId = message.chat.id;

  sessions[sessionId] = [];

  bot.sendMessage(sessionId, botConfig.answerTree.question, {
    reply_markup: getQuestionButtons(botConfig.answerTree)
  });
};
