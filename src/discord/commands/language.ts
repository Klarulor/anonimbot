import {ChatInputCommandInteraction} from "discord.js";
import getUser from "../functions/getUser";
import ru from "../../langs/ru.json";
import ua from "../../langs/ua.json";
import en from "../../langs/en.json";

module.exports = {
    async execute(interaction: ChatInputCommandInteraction){
        const curUser = await getUser(interaction.user.id);
        switch (interaction.options.getString("language")){
            case 'ua': {
                curUser.setLang('ua');
                curUser.updateUser();
                interaction.reply(ua.language_change).catch(()=>{});
                break;
            }
            case 'en': {
                curUser.setLang('en');
                curUser.updateUser();
                interaction.reply(en.language_change).catch(()=>{});
                break;
            }
            case 'ru': {
                curUser.setLang('ru');
                curUser.updateUser();
                interaction.reply(ru.language_change).catch(()=>{});
                break;
            }
            default: {
                interaction.reply('THERE IS NOT SUCH LANGUAGE').catch(()=>{});
                break;
            }
        }
    }
}