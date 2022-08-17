import {Age, Gender, Language, Platform} from "../types";
import {ISearchParams} from "./ISearchParams";

export interface IBotUserProps {
    platform: Platform;
    userid: string;
    lang: Language;
    gender: Gender | null;
    age: Age | null;
    searchPreferences: ISearchParams;
}