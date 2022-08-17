import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../features/interfaces/ILangProps";
import {query, telegramBot} from "../../bot";

export default function cancelAction(){
    telegramBot.action("cancel", async (ctx)=>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
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
            ctx.reply(lang.cancel_ok).catch(()=>{});
        }else{
            ctx.reply(lang.cancel_not_query).catch(()=>{});
        }
    });
}