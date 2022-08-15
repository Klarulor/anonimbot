import config from "../../config.json";
import {Channel, ChatInputCommandInteraction, Client, Interaction, Message, TextChannel} from "discord.js";
import path from 'path';
import {IParsedMessage} from "../telegram/functions/telegramMessageParser";
import {conversations, discordBot, eventHandler, mySQLConnection} from "../bot";
import BotUser from "../classes/BotUser";
import {ILangProps} from "../langs/ILangProps";

const request = require('request');


export default function runDiscordBot(): void {
    discordBot.on('interactionCreate', async (interaction: Interaction) => {
        if (interaction instanceof ChatInputCommandInteraction) {
            if (interaction.channel.isDMBased()) {
                const {commandName} = interaction;
                const commandObj = require(`./commands/${commandName}`);
                commandObj.execute(interaction);
            } else {
                const curUser = await BotUser.getUser(interaction.user.id, "DISCORD");
                const lang: ILangProps = require(`../langs/${curUser.lang}.json`);
                interaction.reply(lang.not_in_dm).catch(()=>{});
            }

        }
    });

    discordBot.on("messageCreate", (message: Message) => {
        if (message.author.bot) return;
        if (!message.channel.isDMBased()) return;
        discordBot.users.fetch(message.author.id).then(async user => {
            const dm = user?.dmChannel ?? await user.createDM();
            if (!conversations.has(message.author.id)) {
                const curUser = await BotUser.getUser(message.author.id, "DISCORD");
                const lang: ILangProps = require(`../langs/${curUser.lang}.json`);
                return dm.send({content: lang.not_in_conversation}).catch(()=>{});
            } else {
                const user = conversations.get(message.author.id);
                switch (user.type) {
                    case "DISCORD": {
                        discordBot.users.fetch(user.id).then(async userToSend => {
                            const dm = userToSend?.dmChannel ?? await userToSend.createDM();
                            let redirect_message = message.content + '\n';
                            message.attachments.map(item => redirect_message += item.url + '\n');
                            dm.send({content: redirect_message}).catch(()=>{});
                        });
                        break;
                    }
                    case "TELEGRAM": {
                        let redirect_message = message.content + '\n';
                        message.attachments.map(item => redirect_message += item.url + '\n');
                        eventHandler.emit('discordMsg', redirect_message, user.id);
                        break;
                    }
                }
            }
        });
    });
    discordBot.on("ready", () => {
        console.log("Launched discord bot!");
        discordBot.user.setPresence({ activities: [{ name: 'type /help' }], status: 'online' });
    });
    eventHandler.on('stickerSend', async (imgPath: string, id: string) => {
        try {
            discordBot.users.fetch(id).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                const imagesPath = path.join(__dirname, `../${imgPath}`);
                dm.send({files: [imagesPath]}).catch(()=>{});
            });
        }catch (err){

        }

    });

    eventHandler.on("discordCompanion", (id: string) => {
        try {
            discordBot.users.fetch(id).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                const curUser = await BotUser.getUser(id, "DISCORD");
                const lang: ILangProps = require(`../langs/${curUser.lang}.json`);
                dm.send(lang.search_find_companion).catch(()=>{});
            });
        } catch (err) {

        }
    });

    eventHandler.on('discordDelete', (id: string) => {
        try {
            discordBot.users.fetch(id).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                const curUser = await BotUser.getUser(id, "DISCORD");
                const lang: ILangProps = require(`../langs/${curUser.lang}.json`);
                dm.send(lang.stop_not_in_conv).catch(()=>{});
            });
        } catch (err) {

        }
    });

    eventHandler.on("telegramMessage", async (msg: IParsedMessage, id: string) => {
        try {
            discordBot.users.fetch(id).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                let imagesPath: any = [];
                if (msg?.files !== undefined) {
                    msg.files.map((item: string) => {
                        imagesPath.push(path.join(__dirname, `../${item}`));
                    });
                } else {
                    imagesPath = undefined;
                }
                dm.send({content: msg.text, files: imagesPath ?? null}).catch(()=>{});
            });
        } catch (err) {
            console.log(err);
        }
    });
    discordBot.login(config.DiscordToken);
}

