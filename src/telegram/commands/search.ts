import {conversations, eventHandler, query, telegramBot} from "../../bot";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../features/interfaces/ILangProps";
import {inlineKeyboard} from "telegraf/typings/markup";

export default function searchCommand(){
    telegramBot.command('search', async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        if(conversations.has(curUser.userid)){
            let companion = conversations.get(curUser.userid);
            conversations.delete(curUser.userid);
            conversations.delete(companion.id);
            eventHandler.emit(`${companion.type.toLowerCase()}Delete`, companion.id);
            await ctx.reply(lang.search_stop_conversation).catch(()=>{});
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

                eventHandler.emit(`${companion.platform.toLowerCase()}Companion`, companion.userid, curUser.platform);
                ctx.reply(`${lang.search_find_companion} \n${lang.platform} ${companion.platform.toLowerCase()}`);
            } else {
                query.push(curUser);
                ctx.reply(lang.search_add_query, {
                    reply_markup:{
                        inline_keyboard: [
                            [ { text: "❌", callback_data: "cancel" } ]
                        ]
                    }
                });
            }
        }else{
           ctx.reply(lang.search_you_already);
        }
    });
}