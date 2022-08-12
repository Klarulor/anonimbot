import config from "../../config.json";
import {Channel, ChatInputCommandInteraction, Client, Interaction, Message, TextChannel} from "discord.js";
import {Telegram} from "telegraf";
import path from 'path';
import {IParsedMessage} from "../telegram/functions/telegramMessageParser";
import {conversations, discordBot, eventHandler, mySQLConnection} from "../bot";
import internal from "stream";

const request = require('request');


export default function runDiscordBot(): void {
    discordBot.on('interactionCreate', async (interaction: Interaction) => {
        if (interaction instanceof ChatInputCommandInteraction) {
            if (interaction.channel.isDMBased()) {
                const {commandName} = interaction;
                const commandObj = require(`./commands/${commandName}`);
                commandObj.execute(interaction);
            } else {
                interaction.reply("Command are not supported in guilds!");
            }

        }
    });

    discordBot.on("messageCreate", (message: Message) => {
        if (message.author.bot) return;
        if (!message.channel.isDMBased()) return;
        discordBot.users.fetch(message.author.id).then(async user => {
            const dm = user?.dmChannel ?? await user.createDM();
            if (!conversations.has(message.author.id)) {
                return dm.send({content: "You have not started searching yet!"}).catch(()=>{});
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
        console.log("Bot has started");
    });
    eventHandler.on('stickerSend', async (imgPath: string) => {
        try {
            discordBot.users.fetch("390561515054563328").then(async user => {
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
                dm.send("Companion was found").catch(()=>{});
            });
        } catch (err) {

        }
    });

    eventHandler.on('discordDelete', (id: string) => {
        try {
            discordBot.users.fetch(id).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                dm.send("Companion ended conversation with you!").catch(()=>{});
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

