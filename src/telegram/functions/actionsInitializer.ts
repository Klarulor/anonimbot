import languageActions from "../actions/language";
import settingsActions from "../actions/settings";
import ageActions from "../actions/age";
import genderActions from "../actions/gender";
import searchparamsActions from "../actions/searchparams";
import searchageActions from "../actions/searchage";
import searchgenderActions from "../actions/searchgender";
import searchcompatibilityActions from "../actions/searchcompatibility";
import cancelAction from "../actions/cancel";

export default function actionsInitializer(){
    languageActions();
    settingsActions();
    ageActions();
    genderActions();
    searchparamsActions();
    searchageActions();
    searchgenderActions();
    searchcompatibilityActions();
    cancelAction();
}