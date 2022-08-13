import {ChatInputCommandInteraction, User} from "discord.js";
import {conversations, eventHandler, query} from "../../bot";
import BotUser, {Lang} from "../../classes/BotUser";
import {ILangProps} from "../../langs/ILangProps";


module.exports = {
    async execute(interaction: ChatInputCommandInteraction) {
        const curUser = await BotUser.getUser(interaction.user.id, "DISCORD");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        let isInQuery = false;
        let indexOfItem: number;
        query.map((item, index) => {
            if (curUser.userid === item.userid) {
                isInQuery = true;
                indexOfItem = index;
            }
        });

        if(isInQuery){
            query.splice(indexOfItem, 1);
            await interaction.reply(lang.cancel_ok).catch(()=>{});
        }else{
            await interaction.reply(lang.cancel_not_query).catch(()=>{});;
        }
    }
}