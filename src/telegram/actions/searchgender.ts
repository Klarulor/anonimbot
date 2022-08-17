import {telegramBot} from "../../bot";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../features/interfaces/ILangProps";
import {Genders} from "../../features/enums";

export default function searchgenderActions(){

    telegramBot.action("Genders.MALE", async (ctx)=>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        curUser.setSearchGender(Genders.MALE).updateUser();
        ctx.reply(lang.searchparams_gender);
        ctx.deleteMessage();
    });

    telegramBot.action("Genders.FEMALE", async (ctx)=>{
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);

        curUser.setSearchGender(Genders.FEMALE).updateUser();
        ctx.reply(lang.searchparams_gender);
        ctx.deleteMessage();
    });
}