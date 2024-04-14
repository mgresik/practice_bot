import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import { nextQuestion } from './next-question.js';
import { start } from './start.js';
import dotenv from 'dotenv'

dotenv.config();

const botConfig = JSON.parse(fs.readFileSync('./bot-config.json').toString());
const bot = new TelegramBot(process.env.API_KEY_BOT, {
  polling: true
});

const sessions = {};

bot.on('message', async message => {
  switch (message.text) {
    case '/start': start(message, sessions, botConfig); break;
    case 'Начать сначала': start(message, sessions, botConfig); break;
    default: nextQuestion(message, sessions, botConfig); break;
  }
})
