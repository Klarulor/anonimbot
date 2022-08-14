import {telegramBot} from "../../bot";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../langs/ILangProps";

export default function startCommand(){
    telegramBot.command('start', async (ctx) => {
        if (!(await BotUser.hasUserTelegramOnly(String(ctx.chat.id)))) {
            ctx.reply(
                `<b> Hello, you are using Anonim Chat Bot for speak to random people! </b>
                <i>Please choose language:</i>`
            , {
                    parse_mode: "HTML",
                    reply_markup:{
                        inline_keyboard: [
                            [ { text: "🇺🇦", callback_data: "ua" }, { text: "🇪🇪", callback_data: "es" }, { text: "🇬🇧", callback_data: "en" },  { text: "🇷🇺", callback_data: "ru" }]
                        ]
                    }
                });
        } else {
            const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
            const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);
            ctx.reply(`<b>${lang.welcome_back}</b>`, {parse_mode: "HTML"});
        }
    });
}
