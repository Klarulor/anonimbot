import startCommand from "../commands/start";
import languageCommand from "../commands/language";
import settingsCommand from "../commands/settings";

export default function commandInitializer(){
    startCommand();
    languageCommand();
    settingsCommand();
}