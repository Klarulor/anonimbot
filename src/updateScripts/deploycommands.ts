import {Ages, Genders, Languages} from "../features/enums";

const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const config = require('../../config.json');

const commands = [
    new SlashCommandBuilder()
        .setName('search')
        .setNameLocalization("uk", "пошук")
        .setNameLocalization("ru", "поиск")
        .setDescription('Searches for a new talk companion!')
        .setDescriptionLocalization("uk", "Пошук рандомного співрозмовника!")
        .setDescriptionLocalization("ru", "Поиск рандомного собеседника!"),
    new SlashCommandBuilder()
        .setName('cancel')
        .setNameLocalization("uk", "відміна")
        .setNameLocalization("ru", "отмена")
        .setDescription('Stop searching!')
        .setDescriptionLocalization("uk", "Відміна пошуку!")
        .setDescriptionLocalization("ru", "Отменить поиск!"),
    new SlashCommandBuilder()
        .setName('help')
        .setNameLocalization("uk", "допомога")
        .setNameLocalization("ru", "помощь")
        .setDescription('Returns info about bots commands!')
        .setDescriptionLocalization("uk", "Допомога по боту!")
        .setDescriptionLocalization("ru", "Помощь по боту!"),
    new SlashCommandBuilder()
        .setName('language')
        .setNameLocalization("uk", "мова")
        .setNameLocalization("ru", "язык")
        .setDescription('Change language setting!')
        .setDescriptionLocalization("uk", "Змінити мову бота!")
        .setDescriptionLocalization("ru", "Изменить язык бота!")
        .addStringOption((option: any): any=>{
                option
                    .setName('language')
                    .setNameLocalization("uk", "мова")
                    .setNameLocalization("ru", "язык")
                    .setDescription('Choose from availible languages!')
                    .setDescriptionLocalization("uk", "Виберіть із доступних мов!")
                    .setDescriptionLocalization("ru", "Выберите из доступных языков!")
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
                        name: "Українська",
                        value: Languages.UA
                    },
                    {
                        name: "Eesti Eesti pergeli Eesti",
                        value: Languages.ES
                    },
                ]
                return option.setRequired(true);
            }),
    new SlashCommandBuilder()
        .setName('profile')
        .setNameLocalization("uk", "профіль")
        .setNameLocalization("ru", "профиль")
        .setDescription('Returns your profile and search settings!')
        .setDescriptionLocalization("uk", "Повертає ваш профіль!")
        .setDescriptionLocalization("ru", "Возвращает ваш профиль!"),
    new SlashCommandBuilder()
        .setName('searchparams')
        .setNameLocalization("uk", "пошуковіпараметри")
        .setNameLocalization("ru", "поисковыепараметры")
        .setDescription('Search params chooser!')
        .setDescriptionLocalization("uk", "Змініть ваші пошукові параметри!")
        .setDescriptionLocalization("ru", "Измените поисковые параметры!")
        .addSubcommand((subcommand: any)=>{
            subcommand.setName('gender');
            subcommand.setNameLocalization("uk", "стать")
            subcommand.setNameLocalization("ru", "стать")
            subcommand.setDescription('Choose gender you are searching for')
            subcommand.addStringOption((option: any): any=>{
                option
                    .setName('gender')
                    .setDescription('Choose gender you are searching for!')
                option.choices = [
                    {
                        name: Genders.MALE,
                        value: Genders.MALE
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
            subcommand.setNameLocalization("uk", "сумісність")
            subcommand.setNameLocalization("ru", "совместимость")
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
            subcommand.setNameLocalization("uk", "вік")
            subcommand.setNameLocalization("ru", "возраст")
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
        .setNameLocalization("uk", "стоп")
        .setNameLocalization("ru", "стоп")
        .setDescription('Stop your conversation')
        .setDescriptionLocalization("uk", "Зупинити розмову!")
        .setDescriptionLocalization("ru", "Остановить разговор!"),
    new SlashCommandBuilder()
        .setName('settings')
        .setNameLocalization("uk", "налаштування")
        .setNameLocalization("ru", "настройки")
        .setDescription('Set your appereance settings')
        .setDescriptionLocalization("uk", "Налаштуйте свій вік і стать!")
        .setDescriptionLocalization("ru", "Настройте свой возраст и стать!")
        .addSubcommand((subcommand: any)=>{
            subcommand.setName('age');
            subcommand.setNameLocalization("uk", "вік")
            subcommand.setNameLocalization("ru", "возраст")
            subcommand.setDescription('Choose your age')
            subcommand.setDescriptionLocalization("uk", "Налаштуйте свій вік!")
            subcommand.setDescriptionLocalization("ru", "Настройте свой возраст!")
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
            subcommand.setNameLocalization("uk", "стать")
            subcommand.setNameLocalization("ru", "стать")
            subcommand.setDescription('Choose your gender')
            subcommand.setDescriptionLocalization("uk", "Налаштуйте свою стать!")
            subcommand.setDescriptionLocalization("ru", "Настройте свою стать!")
            subcommand.addStringOption((option: any): any=>{
                option
                    .setName('gender')
                    .setDescription('Choose from genders!')
                    .setNameLocalization("uk", "стать")
                    .setNameLocalization("ru", "стать")
                    .setDescriptionLocalization("uk", "Виберіть стать!")
                    .setDescriptionLocalization("ru", "Выберите стать!")
                option.choices = [
                    {
                        name: Genders.MALE,
                        value: Genders.MALE
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
