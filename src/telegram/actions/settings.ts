import {telegramBot} from "../../bot";
import BotUser, {Ages} from "../../classes/BotUser";
import {ILangProps} from "../../langs/ILangProps";

export default function settingsActions(){
    telegramBot.action('age', async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        ctx.reply(`<b>${lang.settings_telegram_age}</b>`, {
            parse_mode: "HTML",
            reply_markup:{
                inline_keyboard: [
                    [ { text: Ages.LOW, callback_data: Ages.LOW }, { text: Ages.MEDIUM, callback_data: Ages.MEDIUM },{ text: Ages.HIGH, callback_data: Ages.HIGH }, { text: Ages.VERYHIGH, callback_data: Ages.VERYHIGH } ],
                ]
            }
        });
    });
    telegramBot.action('gender', (ctx) =>{

    });
    telegramBot.action("searchparams", (ctx)=>{

    });
}