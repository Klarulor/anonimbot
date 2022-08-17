import {telegramBot} from "../../bot";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../features/interfaces/ILangProps";
import {Ages} from "../../features/enums";

export default function ageActions(){
    telegramBot.action(Ages.LOW, async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        curUser.setAge(Ages.LOW).updateUser();
        ctx.reply(lang.settings_age);
        ctx.deleteMessage();
    });
    telegramBot.action(Ages.MEDIUM, async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        curUser.setAge(Ages.MEDIUM).updateUser();
        ctx.reply(lang.settings_age);
        ctx.deleteMessage();
    });
    telegramBot.action(Ages.HIGH, async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        curUser.setAge(Ages.HIGH).updateUser();
        ctx.reply(lang.settings_age);
        ctx.deleteMessage();
    });
    telegramBot.action(Ages.VERYHIGH, async (ctx) =>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        curUser.setAge(Ages.VERYHIGH).updateUser();
        ctx.reply(lang.settings_age);
        ctx.deleteMessage();
    });

}