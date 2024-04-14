import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import { getButtons } from './helpers/get-buttons.js';
import dotenv from 'dotenv'

dotenv.config(); 

const botConfig = JSON.parse(fs.readFileSync('./bot-config.json').toString());
const bot = new TelegramBot(process.env.API_KEY_BOT, {
  polling: true
});

const sessions = {};

bot.on('message', async message => {
  switch (message.text) {
    case '/start': start(message); break;
    case 'Начать сначала': start(message); break;
    default: nextQuestion(message); break;
  }
})

const start = (message) => {
  const sessionId = message.chat.id;

  sessions[sessionId] = [];

  bot.sendMessage(sessionId, botConfig.answerTree.question, {
    reply_markup: getQuestionButtons(botConfig.answerTree)
  });
};

const nextQuestion = (message) => {
  const sessionId = message.chat.id;

  const session = sessions[sessionId];

  if (!session) {
    return start(message);
  }
  
  sessions[sessionId].push(message.text);
  
  const nextQuestion = session.reduce((acc, answer) => {
    const treeAnswer = acc.answers[answer];

    if (!treeAnswer) {
      return null;
    }

    return treeAnswer
  }, botConfig.answerTree);

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

const _k = Object.keys;

const getQuestionButtons = question => {
  return getButtons(_k(question.answers).map(a => [a]))
};