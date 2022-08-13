import {ChatInputCommandInteraction} from "discord.js";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../langs/ILangProps";

module.exports = {
    async execute(interaction: ChatInputCommandInteraction){
        const ru: ILangProps = require('../../langs/ru.json');
        const es: ILangProps = require('../../langs/es.json');
        const ua: ILangProps = require('../../langs/ua.json');
        const en: ILangProps = require('../../langs/en.json');
        const curUser = await BotUser.getUser(interaction.user.id, "DISCORD");
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
            case 'es': {
                curUser.setLang('es');
                curUser.updateUser();
                interaction.reply(es.language_change).catch(()=>{});
                break;
            }
            default: {
                interaction.reply('THERE IS NOT SUCH LANGUAGE').catch(()=>{});
                break;
            }
        }
    }
}