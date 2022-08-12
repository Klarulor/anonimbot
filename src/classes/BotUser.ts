import {MysqlKlaruConnection} from "klaru-mysql-wrapper/dist";
import {mySQLConnection} from "../bot";

export type Platform = "DISCORD" | "TELEGRAM";
export type Language = "ru" | "ua" | "en";
export type Gender = "FEMALE" | "MALE" | "OTHER";
export type Age = "13-14" | "15-17" | "18-21" | "22+";
export type Compatibility = "100%" | "50%" | "0%";

export interface ISearchParams {
    compatibility: Compatibility;
    gender: Gender | null;
    age: Age | null;
}

export interface IBotUserProps {
    platform: Platform;
    userid: string;
    lang: Language;
    gender: Gender | null;
    age: Age | null;
    searchPreferences: ISearchParams;
}

export interface IMapUserProps {
    id: string;
    type: Platform;
}

export default class BotUser implements IBotUserProps {
    readonly platform;
    readonly userid;
    public lang;
    public searchPreferences;
    public gender;
    public age;

    constructor(userid: string, platform: Platform, lang: Language, age: Age = null, gender: Gender = null, searchPrefs: ISearchParams = {
        gender: null,
        age: null,
        compatibility: "0%"
    }) {
        this.userid = userid;
        this.platform = platform;
        this.lang = lang;
        this.age = age;
        this.gender = gender;
        this.searchPreferences = searchPrefs;
    }

    public checkCompatibility(searcher: BotUser, object: BotUser) {
        let compatibilityId: number = 0;
        if (searcher.searchPreferences.gender === object.gender) {
            compatibilityId++;
        }
        if (searcher.searchPreferences.age === object.age) {
            compatibilityId++;
        }
        switch (searcher.searchPreferences.compatibility) {
            case "0%": {
                return 1;
            }
            case "50%": {
                if (compatibilityId > 0) {
                    return 1;
                } else {
                    return 0;
                }
            }
            case "100%": {
                if (compatibilityId === 2) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    }

    public setGender(newGender: Gender) {
        this.gender = newGender;
    }

    public setAge(newAge: Age) {
        this.age = newAge;
    }

    public setLanguage(newLanguage: Language) {
        this.lang = newLanguage;
    }

    public setSearchPrefs(newSearchPrefs: ISearchParams) {
        this.searchPreferences = newSearchPrefs;
    }

    public getTypeObject(): IMapUserProps {
        return {
            id: this.userid,
            type: this.platform
        }
    }

    public insertNewUser() {
        switch (this.platform) {
            case "DISCORD": {
                mySQLConnection.reqQuery("INSERT INTO discord (userid, lang, gender, age, searchGender, searchCompatibility, searchAge) VALUES (?, ?, ?, ?, ?, ?, ?)", this.userid, this.lang, this.gender, this.age, this.searchPreferences.gender, this.searchPreferences.compatibility, this.searchPreferences.age);
                break;
            }
            case "TELEGRAM": {
                mySQLConnection.reqQuery("INSERT INTO telegram (userid, lang, gender, age, searchGender, searchCompatibility, searchAge) VALUES (?, ?, ?, ?, ?, ?, ?)", this.userid, this.lang, this.gender, this.age, this.searchPreferences.gender, this.searchPreferences.compatibility, this.searchPreferences.age);
                break;
            }
        }

    }

    public updateUser() {
        switch (this.platform) {
            case "DISCORD": {
                mySQLConnection.reqQuery("UPDATE discord SET lang = ? WHERE userid = ?", this.lang, this.userid);
                mySQLConnection.reqQuery("UPDATE discord SET gender = ? WHERE userid = ?", this.gender, this.userid);
                mySQLConnection.reqQuery("UPDATE discord SET age = ? WHERE userid = ?", this.age, this.userid);
                mySQLConnection.reqQuery("UPDATE discord SET searchGender = ? WHERE userid = ?", this.searchPreferences.gender, this.userid);
                mySQLConnection.reqQuery("UPDATE discord SET searchAge = ? WHERE userid = ?", this.searchPreferences.age, this.userid);
                mySQLConnection.reqQuery("UPDATE discord SET searchCompatibility = ? WHERE userid = ?", this.searchPreferences.compatibility, this.userid);
                break;
            }
            case "TELEGRAM": {
                mySQLConnection.reqQuery("UPDATE telegram SET lang = ? WHERE userid = ?", this.lang, this.userid);
                mySQLConnection.reqQuery("UPDATE telegram SET gender = ? WHERE userid = ?", this.gender, this.userid);
                mySQLConnection.reqQuery("UPDATE telegram SET age = ? WHERE userid = ?", this.age, this.userid);
                mySQLConnection.reqQuery("UPDATE telegram SET searchGender = ? WHERE userid = ?", this.searchPreferences.gender, this.userid);
                mySQLConnection.reqQuery("UPDATE telegram SET searchAge = ? WHERE userid = ?", this.searchPreferences.age, this.userid);
                mySQLConnection.reqQuery("UPDATE telegram SET searchCompatibility = ? WHERE userid = ?", this.searchPreferences.compatibility, this.userid);
                break;
            }
        }
    }
}