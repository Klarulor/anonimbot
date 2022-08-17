import {telegramBot} from "../../bot";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../features/interfaces/ILangProps";
import {Languages} from "../../features/enums";

export default function languageActions(){
    telegramBot.action('ua', (ctx)=>{
        BotUser.getUser(String(ctx.chat.id), "TELEGRAM").then((user: BotUser)=> {
           user.setLang(Languages.UA).updateUser();
           const lang: ILangProps = require(`../../langs/${user.lang}.json`);
           ctx.reply(`<b>${lang.language_change}</b>`, {parse_mode: "HTML"});
        });
        ctx.deleteMessage();
    });

    telegramBot.action('en', (ctx)=>{
        BotUser.getUser(String(ctx.chat.id), "TELEGRAM").then((user: BotUser)=> {
            user.setLang(Languages.EN).updateUser();
            const lang: ILangProps = require(`../../langs/${user.lang}.json`);
            ctx.reply(`<b>${lang.language_change}</b>`, {parse_mode: "HTML"});
        });
        ctx.deleteMessage();
    });

    telegramBot.action('es', (ctx)=>{
        BotUser.getUser(String(ctx.chat.id), "TELEGRAM").then((user: BotUser)=> {
            user.setLang(Languages.ES).updateUser();
            const lang: ILangProps = require(`../../langs/${user.lang}.json`);
            ctx.reply(`<b>${lang.language_change}</b>`, {parse_mode: "HTML"});
        });
        ctx.deleteMessage();
    });

    telegramBot.action('ru', (ctx)=>{
        BotUser.getUser(String(ctx.chat.id), "TELEGRAM").then((user: BotUser)=> {
            user.setLang(Languages.RU).updateUser();
            const lang: ILangProps = require(`../../langs/${user.lang}.json`);
            ctx.reply(`<b>${lang.language_change}</b>`, {parse_mode: "HTML"});
        });
        ctx.deleteMessage();
    });
}