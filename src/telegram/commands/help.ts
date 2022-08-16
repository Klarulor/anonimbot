import {telegramBot} from "../../bot";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../langs/ILangProps";

export default function helpCommand() {
    telegramBot.command("help", async (ctx) => {
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);


        ctx.reply(
            `<b>${lang.help_title}</b>
            
<b>${lang.help_commands_title}</b>
        /language - <i>${lang.help_commands_language}</i>
        /search - <i>${lang.help_commands_search}</i>
        /cancel - <i>${lang.help_commands_cancel}</i>
        /stop - <i>${lang.help_commands_stop}</i>
        /settings - <i>${lang.help_commands_settings}</i>
        /searchparams - <i>${lang.help_commands_searchparams}</i>
        /profile - <i>${lang.help_commands_profile}</i>
        
        
<b>${lang.help_compatibility_title}</b>
    ${lang.help_compatibility_text}

<code>AnonimChatBot v0.1.0 | Questions: @boyfromgod</code>`
            , {
                parse_mode: "HTML"
            }
        )
    })
}