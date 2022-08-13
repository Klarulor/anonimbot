import {mySQLConnection} from "../bot";

export type Platform = "DISCORD" | "TELEGRAM";
export type Lang = "ru" | "ua" | "en" | "es";
export type Gender = "female" | "male";
export type Age = "13-14" | "15-17" | "18-21" | "22+";
export type Compatibility = "100%" | "50%" | "0%";

export enum Ages {
    LOW = "13-14",
    MEDIUM = "15-17",
    HIGH = "18-21",
    VERYHIGH = "22+"
}

export enum Genders {
    FEMALE = "female",
    MALE = "male"
}

export enum Languages {
    RU = "ru",
    UA = "ua",
    EN = "en",
    ES = "es"
}

export interface ISearchParams {
    compatibility: Compatibility;
    gender: Gender | null;
    age: Age | null;
}

export interface IBotUserProps {
    platform: Platform;
    userid: string;
    lang: Lang;
    gender: Gender | null;
    age: Age | null;
    searchPreferences: ISearchParams;
}

export interface IMapUserProps {
    id: string;
    type: Platform;
}

export interface ISqlData {
    id: number;
    userid: string;
    lang: Lang;
    gender: Gender | null;
    age: Age | null;
    searchGender: Gender | null;
    searchAge: Age | null;
    searchCompatibility: Compatibility;
}

export default class BotUser implements IBotUserProps {
    readonly platform;
    readonly userid;
    public lang;
    public searchPreferences;
    public gender;
    public age;

    constructor(userid: string, platform: Platform, lang: Lang, age: Age = null, gender: Gender = null, searchPrefs: ISearchParams = {
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


    public setGender(newGender: Gender) {
        this.gender = newGender;
        return this;
    }

    public setAge(newAge: Age) {
        this.age = newAge;
        return this;
    }

    public setLang(newLang: Lang) {
        this.lang = newLang;
        return this;
    }

    public setSearchPrefs(newSearchPrefs: ISearchParams) {
        this.searchPreferences = newSearchPrefs;
        return this;
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
                mySQLConnection.reqQuery("UPDATE discord SET lang = ?, gender = ?, age = ?, searchGender = ?, searchAge = ?, searchCompatibility = ? WHERE userid = ?",
                    this.lang,
                    this.gender,
                    this.age,
                    this.searchPreferences.gender,
                    this.searchPreferences.age,
                    this.searchPreferences.compatibility,
                    this.userid);
                break;
            }
            case "TELEGRAM": {
                mySQLConnection.reqQuery("UPDATE telegram SET lang = ?, gender = ?, age = ?, searchGender = ?, searchAge = ?, searchCompatibility = ? WHERE userid = ?",
                    this.lang,
                    this.gender,
                    this.age,
                    this.searchPreferences.gender,
                    this.searchPreferences.age,
                    this.searchPreferences.compatibility,
                    this.userid);
                break;
            }
        }
    }

    public static parseSql(sqlData: ISqlData[], platform: Platform) {
        return new BotUser(
            sqlData[0].userid,
            platform,
            sqlData[0].lang,
            sqlData[0].age,
            sqlData[0].gender,
            {
                compatibility: sqlData[0].searchCompatibility,
                age: sqlData[0].searchAge,
                gender: sqlData[0].searchGender
            });
    }

    public static checkCompatibility(searcher: BotUser, object: BotUser) {
        let compatibilityId: number = 0;
        let searcherCom = 0;
        let objectCom = 0;
        if (searcher.searchPreferences.gender === object.gender) {
            compatibilityId++;
        }
        if (searcher.searchPreferences.age === object.age) {
            compatibilityId++;
        }
        switch (searcher.searchPreferences.compatibility) {
            case "0%": {
                searcherCom = 1;
                break;
            }
            case "50%": {
                searcherCom = (compatibilityId > 0) ? 1 : 0;
                break;
            }
            case "100%": {
                searcherCom = (compatibilityId === 2) ? 1 : 0;
                break;
            }
        }
        compatibilityId = 0;
        if (object.searchPreferences.gender === searcher.gender) {
            compatibilityId++;
        }
        if (object.searchPreferences.age === searcher.age) {
            compatibilityId++;
        }
        switch (object.searchPreferences.compatibility) {
            case "0%": {
                objectCom = 1;
                break;
            }
            case "50%": {
                objectCom = (compatibilityId > 0) ? 1 : 0;
                break;
            }
            case "100%": {
                objectCom = (compatibilityId === 2) ? 1 : 0;
                break;
            }
        }
        return ((searcherCom===1)&&(objectCom===1)) ? 1 : 0;
    }

    public static async getUser(id:string, platform: Platform){
        if(platform=="TELEGRAM"){
            const data: ISqlData[] = await mySQLConnection.reqQuery("SELECT * FROM telegram WHERE userid = ?", id);
            if (data === null) {
                const curUser = new BotUser(id, "TELEGRAM", "ru");
                curUser.insertNewUser();
                return curUser;
            } else {
                return BotUser.parseSql(data, "TELEGRAM");
            }
        }
        const data: ISqlData[] = await mySQLConnection.reqQuery("SELECT * FROM discord WHERE userid = ?", id);
        if (data === null) {
            const curUser = new BotUser(id, "DISCORD", "ru");
            curUser.insertNewUser();
            return curUser;
        } else {
            return BotUser.parseSql(data, "DISCORD");
        }
    }

}