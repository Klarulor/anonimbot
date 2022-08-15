import startCommand from "../commands/start";
import languageCommand from "../commands/language";
import settingsCommand from "../commands/settings";
import profileCommand from "../commands/profile";
import searchCommand from "../commands/search";
import stopCommand from "../commands/stop";
import helpCommand from "../commands/help";

export default function commandInitializer(){
    startCommand();
    languageCommand();
    settingsCommand();
    profileCommand();
    searchCommand();
    stopCommand();
    helpCommand();
}