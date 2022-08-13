import {ChatInputCommandInteraction} from "discord.js";
import {ILangProps} from "../../langs/ILangProps";
import {conversations, eventHandler} from "../../bot";
import BotUser from "../../classes/BotUser";


module.exports = {
    async execute(interaction: ChatInputCommandInteraction){
        const curUser = await BotUser.getUser(interaction.user.id, "DISCORD");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);
        if(conversations.has(curUser.userid)){
            let companion = conversations.get(curUser.userid);
            conversations.delete(curUser.userid);
            conversations.delete(companion.id);
            eventHandler.emit(`${companion.type.toLowerCase()}Delete`, companion.id);
            await interaction.reply(lang.search_stop_conversation).catch(()=>{});
        }else{
            await interaction.reply(lang.stop_not_in_conv).catch(()=>{});
        }
    }
}