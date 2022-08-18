import {mySQLConnection} from "../bot";
import {Age, Compatibility, Gender, Language, Platform} from "../features/types";
import {IBotUserProps} from "../features/interfaces/IBotUserProps";
import {ISearchParams} from "../features/interfaces/ISearchParams";
import {IMapUserProps} from "../features/interfaces/IMapUserProps";
import {ISQLData} from "../features/interfaces/ISQLData";


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


    public setGender(newGender: Gender) {
        this.gender = newGender;
        return this;
    }

    public setAge(newAge: Age) {
        this.age = newAge;
        return this;
    }

    public setLang(newLang: Language) {
        this.lang = newLang;
        return this;
    }

    public setSearchPrefs(newSearchPrefs: ISearchParams) {
        this.searchPreferences = newSearchPrefs;
        return this;
    }

    public setSearchAge(newAge: Age){
        this.searchPreferences.age = newAge;
        return this;
    }

    public setSearchGender(newGender: Gender){
        this.searchPreferences.gender = newGender;
        return this;
    }

    public setSearchCompability(newCompatibility: Compatibility){
        this.searchPreferences.compatibility = newCompatibility;
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

    public static parseSql(sqlData: ISQLData[], platform: Platform) {
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

    public static checkCompatibility(searcher: BotUser, target: BotUser) {
        let compatibilityId: number = 0;
        let searcherCom = 0;
        let objectCom = 0;
        if (searcher.searchPreferences.gender === target.gender || !searcher.searchPreferences.gender) {
            compatibilityId++;
        }
        if (searcher.searchPreferences.age === target.age || !searcher.searchPreferences.age) {
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
        if (target.searchPreferences.gender === searcher.gender || !target.searchPreferences.gender) {
            compatibilityId++;
        }
        if (target.searchPreferences.age === searcher.age || !target.searchPreferences.age) {
            compatibilityId++;
        }
        switch (target.searchPreferences.compatibility) {
            case "0%": {
                objectCom = 1;
                break;
            }
            case "50%": {
                objectCom = compatibilityId > 0 ? 1 : 0;
                break;
            }
            case "100%": {
                objectCom = compatibilityId === 2 ? 1 : 0;
                break;
            }
        }
        return ((searcherCom === 1) && (objectCom === 1)) ? 1 : 0;
    }

    public static async hasUserTelegramOnly(id: string) {
        const data: ISQLData[] = await mySQLConnection.reqQuery("SELECT * FROM telegram WHERE userid = ?", id);
        return !data;
    }

    public static async getUser(id: string, platform: Platform) {
        if (platform === "TELEGRAM") {
            const data: ISQLData[] = await mySQLConnection.reqQuery("SELECT * FROM telegram WHERE userid = ?", id);
            if (!data) {
                const curUser = new BotUser(id, "TELEGRAM", "en");
                curUser.insertNewUser();
                return curUser;
            } else
                return BotUser.parseSql(data, "TELEGRAM");
        } else {
            const data: ISQLData[] = await mySQLConnection.reqQuery("SELECT * FROM discord WHERE userid = ?", id);
            console.log(data);
            if (!data) {
                const curUser = new BotUser(id, "DISCORD", "en");
                curUser.insertNewUser();
                return curUser;
            } else
                return BotUser.parseSql(data, "DISCORD");
        }

    }
}