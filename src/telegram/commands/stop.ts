import {conversations, eventHandler, telegramBot} from "../../bot";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../features/interfaces/ILangProps";

export default function stopCommand() {
    telegramBot.command('stop', async (ctx) => {
        const curUser = await BotUser.getUser(String(ctx.chat.id), "TELEGRAM");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);
        if (conversations.has(curUser.userid)) {
            let companion = conversations.get(curUser.userid);
            conversations.delete(curUser.userid);
            conversations.delete(companion.id);
            eventHandler.emit(`${companion.type.toLowerCase()}Delete`, companion.id);
            ctx.reply(lang.search_stop_conversation).catch(() => {});
        } else {
            ctx.reply(lang.stop_not_in_conv).catch(() => {});
        }
    });
}