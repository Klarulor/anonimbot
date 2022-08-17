import {telegramBot} from "../../bot";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../features/interfaces/ILangProps";

export default function profileCommand(){
    telegramBot.command('profile', async (ctx) => {
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);


        ctx.reply(
            `⚙️<b>${lang.profile_stats}</b>
  -  ${lang.profile_stats_age} ${curUser.age ?? lang.profile_stats_undefined}
  -  ${lang.profile_stats_gender} ${curUser.gender ?? lang.profile_stats_undefined}
  -  <i>${lang.profile_search_preferences}</i>
      -  ${lang.profile_search_preferences_age} ${curUser.searchPreferences.age ?? lang.profile_stats_undefined}
      -  ${lang.profile_search_preferences_gender} ${curUser.searchPreferences.gender ?? lang.profile_stats_undefined}
      -  ${lang.profile_search_preferences_compatibility} ${curUser.searchPreferences.compatibility ?? lang.profile_stats_undefined}
`
            , {
              parse_mode: "HTML"
            }
        )
    })
}