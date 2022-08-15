import {telegramBot} from "../../bot";
import BotUser, {Ages, Genders} from "../../classes/BotUser";
import {ILangProps} from "../../langs/ILangProps";

export default function searchparamsActions(){

    telegramBot.action("searchcompatibility", async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        ctx.reply(`<b>${lang.settings_telegram_searchcompatibility}</b>`,
            {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: "0%", callback_data: "0%"},
                            {text: "50%", callback_data: "50%"},
                            {text: "100%", callback_data: "100%"}
                        ],
                    ]
                }
            });
    });

    telegramBot.action("searchgender", async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        ctx.reply(`<b>${lang.settings_telegram_searchgender}</b>`,
            {
                parse_mode: "HTML",
                reply_markup:{
                    inline_keyboard: [
                        [
                            { text: "🧑", callback_data: "Genders.MALE" },
                            { text: "👩🏼", callback_data: "Genders.FEMALE" }
                        ],
                    ]
                }
            });
    });

    telegramBot.action("searchage", async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        ctx.reply(`<b>${lang.settings_telegram_searchage}</b>`,
            {
                parse_mode: "HTML",
                reply_markup:{
                    inline_keyboard: [
                        [
                            { text: Ages.LOW, callback_data: "Ages.LOW" },
                            { text: Ages.MEDIUM, callback_data: "Ages.MEDIUM" },
                            { text: Ages.HIGH, callback_data: "Ages.HIGH" },
                            { text: Ages.VERYHIGH, callback_data: "Ages.VERYHIGH" }
                        ],
                    ]
                }
            })
    });

}