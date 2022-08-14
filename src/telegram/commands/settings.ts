import {telegramBot} from "../../bot";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../langs/ILangProps";

export default function settingsCommand(){
    telegramBot.command('settings', async (ctx) => {
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);
        ctx.reply(
            `<b>${lang.settings_telegram}</b>` ,
            {
                parse_mode: "HTML",
                reply_markup:{
                    inline_keyboard: [
                        [ { text: lang.settings_telegram_buttons_age, callback_data: "age" }, { text: lang.settings_telegram_buttons_gender, callback_data: "gender" } ],
                        [ { text: lang.settings_telegram_buttons_searchparams, callback_data: "searchparams" } ]
                    ]

                }
            }
        );
    });
}