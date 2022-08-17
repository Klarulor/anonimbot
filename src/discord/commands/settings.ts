import {ChatInputCommandInteraction} from "discord.js";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../features/interfaces/ILangProps";
import {Age, Gender} from "../../features/types";


module.exports = {
    async execute(interaction: ChatInputCommandInteraction){
        const curUser = await BotUser.getUser(interaction.user.id, "DISCORD");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);
        switch (interaction.options.getSubcommand(false)){
            case "age":{
                const age = interaction.options.getString("age") as Age;
                curUser.setAge(age).updateUser();
                interaction.reply(lang.settings_age);
                break;
            }
            case "gender": {
                const gender = interaction.options.getString("gender") as Gender;
                curUser.setGender(gender).updateUser();
                interaction.reply(lang.settings_gender);
                break;
            }
        }

    }
}