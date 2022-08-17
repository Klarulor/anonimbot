import {telegramBot} from "../../bot";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../features/interfaces/ILangProps";
import {Ages, Genders} from "../../features/enums";

export default function settingsActions(){
    telegramBot.action('age', async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        ctx.reply(`<b>${lang.settings_telegram_age}</b>`, {
            parse_mode: "HTML",
            reply_markup:{
                inline_keyboard: [
                    [
                        { text: Ages.LOW, callback_data: Ages.LOW },
                        { text: Ages.MEDIUM, callback_data: Ages.MEDIUM },
                        { text: Ages.HIGH, callback_data: Ages.HIGH },
                        { text: Ages.VERYHIGH, callback_data: Ages.VERYHIGH }
                    ],
                ]
            }
        });
    });
    telegramBot.action('gender', async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        ctx.reply(`<b>${lang.settings_telegram_gender}</b>`, {
            parse_mode: "HTML",
            reply_markup:{
                inline_keyboard: [
                    [
                        { text: "🧑", callback_data: Genders.MALE },
                        { text: "👩🏼", callback_data: Genders.FEMALE }
                    ],
                ]
            }
        });
    });
    telegramBot.action("searchparams", async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);


        ctx.reply(`<b>${lang.settings_telegram_searchparams}</b>`, {
            parse_mode: "HTML",
            reply_markup:{
                inline_keyboard: [
                    [
                        { text: lang.settings_telegram_buttons_compatibility, callback_data: "searchcompatibility" },
                        { text: lang.settings_telegram_buttons_age, callback_data: "searchage" },
                        { text: lang.settings_telegram_buttons_gender, callback_data: "searchgender" }
                    ],
                ]
            }
        });
    });
}