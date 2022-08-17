import {telegramBot} from "../../bot";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../features/interfaces/ILangProps";

export default function searchcompatibilityActions(){
    telegramBot.action("0%", async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        curUser.setSearchCompability("0%").updateUser();
        ctx.reply(lang.searchparams_compatibility);
        ctx.deleteMessage();
    });

    telegramBot.action("50%", async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        curUser.setSearchCompability("50%").updateUser();
        ctx.reply(lang.searchparams_compatibility);
        ctx.deleteMessage();
    });

    telegramBot.action("100%", async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        curUser.setSearchCompability("100%").updateUser();
        ctx.reply(lang.searchparams_compatibility);
        ctx.deleteMessage();
    });
}