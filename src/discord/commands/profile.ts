import {ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import getUser from "../functions/getUser";
import {ILangProps} from "../../langs/ILangProps";


module.exports = {
    async execute(interaction: ChatInputCommandInteraction) {
        const curUser = await getUser(interaction.user.id);
        const lang: ILangProps = require(`../../langs/${curUser.lang}.json`);
        const embedMessage = new EmbedBuilder()
            .setColor(Math.floor(Math.random() * 16777215))
            .setTitle(interaction.user.tag)
            .setThumbnail(interaction.user.avatarURL())
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {
                    name: `__**${lang.profile_stats}**__`,
                    value: `**${lang.profile_stats_age}** *\`\`${curUser.age ?? lang.profile_stats_undefined}\`\`*
                            **${lang.profile_stats_gender}** *\`\`${curUser.gender ?? lang.profile_stats_undefined}\`\`*`
                },
                {name: '\u200B', value: '\u200B'},
                {
                    name: `__**${lang.profile_search_preferences}**__`,
                    value: `**${lang.profile_search_preferences_age}** *\`\`${curUser.searchPreferences.age ?? lang.profile_stats_undefined}\`\`*
                            **${lang.profile_search_preferences_gender}** *\`\`${curUser.searchPreferences.gender ?? lang.profile_stats_undefined}\`\`*
                            **${lang.profile_search_preferences_compatibility}** *\`\`${curUser.searchPreferences.compatibility ?? lang.profile_stats_undefined}\`\`*`,
                    inline: false
                },
                {name: '\u200B', value: '\u200B'},
            )
            .setFooter({text: 'AnonimChatBot v0.1.0'});

        interaction.reply({embeds: [embedMessage]}).catch(() => {
        });
    }
}