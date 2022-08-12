import {Ages, Genders, Languages} from "../classes/BotUser";

const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const config = require('../../config.json');

const commands = [
    new SlashCommandBuilder()
        .setName('search')
        .setDescription('Searches for a new talk companion!'),
    new SlashCommandBuilder()
        .setName('cancel')
        .setDescription('Stop searching!'),
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Returns info about bots commands!'),
    new SlashCommandBuilder()
        .setName('language')
        .setDescription('Change language setting!')
        .addStringOption((option: any): any=>{
                option
                    .setName('language')
                    .setDescription('Choose from availible languages!')
                option.choices = [
                    {
                        name: "English",
                        value: Languages.EN
                    },
                    {
                        name: "Русский",
                        value: Languages.RU
                    },
                    {
                        name: "Український",
                        value: Languages.UA
                    },
                ]
                return option.setRequired(true);
            }),
    new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Returns your profile and search settings!'),
    new SlashCommandBuilder()
        .setName('searchparams')
        .setDescription('Search params chooser!')
        .addSubcommand((subcommand: any)=>{
            subcommand.setName('gender');
            subcommand.setDescription('Choose gender you are searching for')
            subcommand.addStringOption((option: any): any=>{
                option
                    .setName('gender')
                    .setDescription('Choose gender you are searching for!')
                option.choices = [
                    {
                        name: Genders.MALE,
                        value: Genders.FEMALE
                    },
                    {
                        name: Genders.FEMALE,
                        value: Genders.FEMALE
                    },
                ]
                return option.setRequired(true);
            })
            return subcommand;
        })
        .addSubcommand((subcommand: any)=>{
            subcommand.setName('compatibility');
            subcommand.setDescription('Choose level of search params compatibility!')
            subcommand.addStringOption((option: any): any=>{
                option
                    .setName('compatibility')
                    .setDescription('Choose level of search params compatibility!')
                option.choices = [
                    {
                        name: "0%",
                        value: "0%"
                    },
                    {
                        name: "50%",
                        value: "50%"
                    },
                    {
                        name: "100%",
                        value: "100%"
                    },
                ]
                return option.setRequired(true);
            })
            return subcommand;
        })
        .addSubcommand((subcommand: any)=>{
            subcommand.setName('age');
            subcommand.setDescription('Choose age of person you are looking for')
            subcommand.addStringOption((option: any): any=>{
                option
                    .setName('age')
                    .setDescription('Choose age of person you are looking for!')
                option.choices = [
                    {
                        name: Ages.LOW,
                        value: Ages.LOW
                    },
                    {
                        name: Ages.MEDIUM,
                        value: Ages.MEDIUM
                    },
                    {
                        name: Ages.HIGH,
                        value: Ages.HIGH
                    },
                    {
                        name: Ages.VERYHIGH,
                        value: Ages.VERYHIGH
                    },
                ]
                return option.setRequired(true);
            })
            return subcommand;
        }),
    new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop your conversation'),
    new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Set your appereance settings')
        .addSubcommand((subcommand: any)=>{
            subcommand.setName('age');
            subcommand.setDescription('Choose your age')
            subcommand.addStringOption((option: any): any=>{
                option
                    .setName('age')
                    .setDescription('Choose from ages!')
                option.choices = [
                    {
                        name: Ages.LOW,
                        value: Ages.LOW
                    },
                    {
                        name: Ages.MEDIUM,
                        value: Ages.MEDIUM
                    },
                    {
                        name: Ages.HIGH,
                        value: Ages.HIGH
                    },
                    {
                        name: Ages.VERYHIGH,
                        value: Ages.VERYHIGH
                    },
                ]
                return option.setRequired(true);
            })
            return subcommand;
        })
        .addSubcommand((subcommand: any)=>{
            subcommand.setName('gender');
            subcommand.setDescription('Choose your gender')
            subcommand.addStringOption((option: any): any=>{
                option
                    .setName('gender')
                    .setDescription('Choose from genders!')
                option.choices = [
                    {
                        name: Genders.MALE,
                        value: Genders.FEMALE
                    },
                    {
                        name: Genders.FEMALE,
                        value: Genders.FEMALE
                    },
                ]
                return option.setRequired(true);
            })
            return subcommand;
        })
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(config.DiscordToken);

rest.put(Routes.applicationCommands(config.DiscordClientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
