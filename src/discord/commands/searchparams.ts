import {ChatInputCommandInteraction} from "discord.js";
import BotUser, {Age, Compatibility, Gender} from "../../classes/BotUser";
import {ILangProps} from "../../langs/ILangProps";


module.exports = {
    async execute(interaction: ChatInputCommandInteraction) {
        const curUser = await BotUser.getUser(interaction.user.id, "DISCORD");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);
        switch (interaction.options.getSubcommand(false)){
            case "age": {
                const age = interaction.options.getString("age") as Age;
                curUser.setSearchPrefs({
                    age,
                    gender: curUser.searchPreferences.gender,
                    compatibility: curUser.searchPreferences.compatibility
                }).updateUser();
                interaction.reply(lang.searchparams_age);
                break;
            }
            case "gender": {
                const gender = interaction.options.getString("gender") as Gender;
                curUser.setSearchPrefs({
                    age: curUser.searchPreferences.age,
                    gender,
                    compatibility: curUser.searchPreferences.compatibility
                }).updateUser();
                interaction.reply(lang.searchparams_gender);
                break;
            }
            case "compatibility": {
                const compatibility = interaction.options.getString("compatibility") as Compatibility;
                curUser.setSearchPrefs({
                    age: curUser.searchPreferences.age,
                    gender: curUser.searchPreferences.gender,
                    compatibility
                }).updateUser();
                interaction.reply(lang.searchparams_compatibility);
                break;
            }
        }
    }
}