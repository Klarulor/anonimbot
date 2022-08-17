import {Age, Compatibility, Gender, Language} from "../types";


export interface ISQLData {
    id: number;
    userid: string;
    lang: Language;
    gender: Gender | null;
    age: Age | null;
    searchGender: Gender | null;
    searchAge: Age | null;
    searchCompatibility: Compatibility;
}