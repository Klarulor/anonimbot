import languageActions from "../actions/language";
import settingsActions from "../actions/settings";
import ageActions from "../actions/age";

export default function actionsInitializer(){
    languageActions();
    settingsActions();
    ageActions();
}