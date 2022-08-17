import {ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import BotUser from "../../classes/BotUser";
import {ILangProps} from "../../features/interfaces/ILangProps";


module.exports = {
    async execute(interaction: ChatInputCommandInteraction) {
        const curUser = await BotUser.getUser(interaction.user.id, "DISCORD");
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);
        const embed = new EmbedBuilder()
            .setColor(0x46c03b)
            .setTitle(lang.help_title)
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: lang.help_commands_title, value: `\`\`/language\`\` - ${lang.help_commands_language}
\`\`/search\`\` - ${lang.help_commands_search}
\`\`/cancel\`\` - ${lang.help_commands_cancel}
\`\`/stop\`\` - ${lang.help_commands_stop}
\`\`/settings\`\` - ${lang.help_commands_settings}
\`\`/searchparams\`\` - ${lang.help_commands_searchparams}
\`\`/profile\`\` - ${lang.help_commands_profile}`},
                {name: '\u200B', value: '\u200B'},
                {name: lang.help_compatibility_title, value: lang.help_compatibility_text},
            )
            .setFooter({text: 'AnonimChatBot v0.2.0 | Questions: Boy From God#2772'});
        interaction.reply({embeds: [embed]});
    }
}