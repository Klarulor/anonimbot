import {ChatInputCommandInteraction, User} from "discord.js";
import {conversations, eventHandler, query} from "../../bot";
import BotUser, {Lang} from "../../classes/BotUser";
import {ILangProps} from "../../langs/ILangProps";


module.exports = {
    async execute(interaction: ChatInputCommandInteraction) {
        const curUser = await BotUser.getUser(interaction.user.id, "DISCORD");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        if(conversations.has(curUser.userid)){
            let companion = conversations.get(curUser.userid);
            conversations.delete(curUser.userid);
            conversations.delete(companion.id);
            eventHandler.emit(`${companion.type.toLowerCase()}Delete`, companion.id);
            await interaction.channel.send(lang.search_stop_conversation).catch(()=>{});
        }


        let isInQuery = false;
        query.map(item => {
            if (curUser.userid === item.userid) {
                isInQuery = true;
            }
        });
        if (!isInQuery) {
            let match = false;
            let searchUserIndex: number = 0;
            query.map((item, index) => {
                switch (BotUser.checkCompatibility(curUser, item)) {
                    case 1: {
                        match = true;
                        searchUserIndex = index;
                        break;
                    }
                    case 0: {
                        break;
                    }
                }
            });

            if (match) {
                const companion = query[searchUserIndex];
                query.splice(searchUserIndex, 1);

                conversations.set(companion.userid, curUser.getTypeObject());
                conversations.set(curUser.userid, companion.getTypeObject());

                eventHandler.emit(`${companion.platform.toLowerCase()}Companion`, companion.userid);
                await interaction.reply(lang.search_find_companion).catch(()=>{});
            } else {
                query.push(curUser);
                await interaction.reply(lang.search_add_query).catch(()=>{});
            }
        }else{
            await interaction.reply(lang.search_you_already).catch(()=>{});
        }
    }

}