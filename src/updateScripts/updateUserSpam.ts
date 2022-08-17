import config from "../../config.json";
import {MysqlKlaruConnection} from "klaru-mysql-wrapper/dist";
import {ISQLData} from "../features/interfaces/ISQLData";
import BotUser from "../classes/BotUser";
import {discordBot, telegramBot} from "../bot";
import {EmbedBuilder} from "discord.js";
import {Telegram} from "telegraf";

const telegram = new Telegram(config.TelegramToken);
const mySQLConnection = new MysqlKlaruConnection();
mySQLConnection.connect(config.SQLHost, +config.SQLPort, config.SQLUserName, config.SQLPassword, config.SQLDatabase, async () => {
    console.log("Successfully connected to MySQL!");
    let data: ISQLData[] = await mySQLConnection.reqRaw("SELECT * FROM discord LIMIT 1000;")
    for (let user of data) {
        let ourUser: BotUser = BotUser.parseSql([user], "DISCORD");
        discordBot.users.fetch(ourUser.userid).then(async user => {
            const dm = await user.createDM();

            const embed = new EmbedBuilder()
                .setFooter({text: 'AnonimChatBot v0.2.0 | Questions: Boy From God#2772'})
                .setColor(0xff6b00);
            switch (ourUser.lang) {
                case "ru": {
                    embed.setTitle("AnonimChatBot | Список изменений v0.2.0");
                    embed.addFields([{
                        name: "Общее",
                        value: "1. Теперь отображается с какой платформы сидит пользователь.\n2. Внутреннее изменения и фикс внутренних багов."
                    }, {
                        name: "Telegram",
                        value: "1. Фикс бага с языком"
                    },
                         {
                            name: "Discord",
                            value: "1. Фикс бага с фразой при завершение диалога"
                        }]);
                    break;
                }
                case "ua": {
                    embed.setTitle("AnonimChatBot | Лист змін v0.2.0");
                    embed.addFields([{
                        name: "Суцільне",
                        value: "1. Тепер ви бачите з якої платформи сидить співрозмовник.\n2. Внутрішні зміни і фікс внутрішніх багів."
                    }, {
                        name: "Telegram",
                        value: "1. Фікс бага з мовою"
                    },
                        {
                            name: "Discord",
                            value: "1. Фікс бага с фразою при завершені діалога"
                        }]);
                    break;
                }
                case "es":
                case "en": {
                    embed.setTitle("AnonimChatBot | ChangeLog v0.2.0");
                    embed.addFields([{
                        name: "Common",
                        value: "1. Now displays what platform the user is.\n2. Inbot tech changes and fix bugs."
                    }, {
                        name: "Telegram",
                        value: "1. Fix bug with language."
                    },
                        {
                            name: "Discord",
                            value: "1. Fix bug with frase when stopping dialog"
                        }]);
                    break;
                }
            }
            dm.send({embeds: [embed]}).catch(() => {
            });
        });
    }
    let newData: ISQLData[] = await mySQLConnection.reqRaw("SELECT * FROM telegram LIMIT 1000;");
    for (let user of newData) {
        let ourUser: BotUser = BotUser.parseSql([user], "TELEGRAM");

        switch (ourUser.lang) {
            case "ru": {
                telegram.sendMessage(ourUser.userid,`<b>AnonimChatBot | Список изменений v0.2.0</b>
                
<b>Общее</b>
1. Теперь отображается с какой платформы сидит пользователь.\n2. Внутреннее изменения и фикс внутренних багов.

<b>Telegram</b>
1. Фикс бага с языком`
                    , {
                        parse_mode: "HTML"
                    });
                break;
            }
            case "ua": {
                telegram.sendMessage(ourUser.userid,`<b>AnonimChatBot | Лист змін v0.2.0</b>
                
<b>Суцільне</b>
1. Тепер ви бачите з якої платформи сидить співрозмовник.\n2. Внутрішні зміни і фікс внутрішніх багів.

<b>Telegram</b>
1. Фікс бага з мовою`
                    , {
                        parse_mode: "HTML"
                    });
                break;
            }
            case "es":
            case "en": {
                telegram.sendMessage(ourUser.userid,`<b>AnonimChatBot | ChangeLog v0.2.0</b>
                
<b>Common</b>
1. Now displays what platform the user is.\n2. Inbot tech changes and fix bugs.

<b>Telegram</b>
1. Fix bug with language.`
                , {
                    parse_mode: "HTML"
                    });
                break;
            }
        }
    }
});


