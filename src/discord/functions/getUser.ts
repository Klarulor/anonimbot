import BotUser, {ISqlData} from "../../classes/BotUser";
import {mySQLConnection} from "../../bot";

export default async function getUser(id: string) {
    const data: ISqlData[] = await mySQLConnection.reqQuery("SELECT * FROM discord WHERE userid = ?", id);
    if (data === null) {
        const curUser = new BotUser(id, "DISCORD", "ru");
        curUser.insertNewUser();
        return curUser;
    } else {
        return BotUser.parseSql(data, "DISCORD");
    }
}