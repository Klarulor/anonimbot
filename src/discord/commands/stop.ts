import {ChatInputCommandInteraction} from "discord.js";
import getUser from "../functions/getUser";
import {ILangProps} from "../../langs/ILangProps";
import {conversations, eventHandler} from "../../bot";


module.exports = {
    async execute(interaction: ChatInputCommandInteraction){
        const curUser = await getUser(interaction.user.id);
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);
        if(conversations.has(curUser.userid)){
            let companion = conversations.get(curUser.userid);
            conversations.delete(curUser.userid);
            conversations.delete(companion.id);
            switch (companion.type){
                case "DISCORD": {
                    eventHandler.emit("discordDelete", companion.id);
                    break;
                }
                case "TELEGRAM": {
                    eventHandler.emit("telegramDelete", companion.id);
                    break;
                }
            }
            await interaction.reply(lang.search_stop_conversation).catch(()=>{});
        }else{
            await interaction.reply(lang.stop_not_in_conv).catch(()=>{});
        }
    }
}