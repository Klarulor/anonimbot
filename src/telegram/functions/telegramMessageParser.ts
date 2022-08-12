import EventEmitter from "events";
import ru from "../../langs/ru.json";
import fs from "fs";
import {Telegram} from "telegraf";
const request = require('request');

export interface IParsedMessage {
    text: string | undefined;
    files: string[] | undefined;
}

const download = function (uri: any, filename: any, pathName: any, callback: any = function () {
}) {
    request.head(uri, async function (err: any, res: any, body: any) {
        request(uri).pipe(fs.createWriteStream(`src/${pathName}/${filename}.${uri.split('.').pop()}`)).on('close', callback);
    });
};

export default function telegramMessageParser(ctx: any, telegram: Telegram, downloadEm: EventEmitter) {

        downloadEm.on('finally', () => {
            downloadEm.emit('messageConverted',{
                //@ts-ignore
                text: text === "" ? ctx.message?.text : text,
                files: files.length === 0 ? undefined : files
            });

        });
        downloadEm.on('document', () => {
            //@ts-ignore
            if (ctx.message?.document !== undefined) {
                //@ts-ignore
                telegram.getFileLink(ctx.message?.document.file_id).then(async url => {
                    //@ts-ignore
                    download(url.href, ctx.message?.document.file_id, "telegramImageCache", function () {
                        //@ts-ignore
                        files.push(`telegramImageCache/${ctx.message?.document.file_id}.${url.href.split('.').pop()}`);
                        //@ts-ignore
                        text = ctx.message?.caption || " ";
                        downloadEm.emit('finally');
                    });
                });
            } else {
                downloadEm.emit('finally');
            }
        })
        downloadEm.on('voice', () => {
            //@ts-ignore
            if (ctx.message?.voice !== undefined) {
                //@ts-ignore
                telegram.getFileLink(ctx.message?.voice.file_id).then(async url => {
                    //@ts-ignore
                    download(url.href, ctx.message?.voice.file_id, "telegramImageCache", function () {
                        //@ts-ignore
                        files.push(`telegramImageCache/${ctx.message?.voice.file_id}.${url.href.split('.').pop()}`);
                        //@ts-ignore
                        text = ctx.message?.caption || ru.voice;
                        downloadEm.emit('document');
                    });
                });
            } else {
                downloadEm.emit('document');
            }
        });
        downloadEm.on('audio', () => {
            //@ts-ignore
            if (ctx.message?.audio !== undefined) {
                //@ts-ignore
                telegram.getFileLink(ctx.message?.audio.file_id).then(async url => {
                    //@ts-ignore
                    download(url.href, ctx.message?.audio.file_id, "telegramImageCache", function () {
                        //@ts-ignore
                        files.push(`telegramImageCache/${ctx.message?.audio.file_id}.${url.href.split('.').pop()}`);
                        //@ts-ignore
                        text = ctx.message?.caption || " ";
                        downloadEm.emit('voice');
                    });
                });
            } else {
                downloadEm.emit('voice');
            }
        });

        downloadEm.on('photo', () => {
            //@ts-ignore
            if (ctx.message?.photo !== undefined) {
                //@ts-ignore
                let ourImage: object = ctx.message?.photo.reduce((max, item) => {
                    return item.file_size > max.file_size ? item : max;
                });
                //@ts-ignore
                telegram.getFileLink(ourImage.file_id).then(async url => {
                    //@ts-ignore
                    download(url.href, ourImage.file_id, "telegramImageCache", function () {
                        //@ts-ignore
                        files.push(`telegramImageCache/${ourImage.file_id}.${url.href.split('.').pop()}`);
                        //@ts-ignore
                        text = ctx.message?.caption || " ";
                        downloadEm.emit('audio');
                    });
                });
            } else {
                downloadEm.emit('audio');
            }
        });

        let text = "";
        let files: string[] = []

        //@ts-ignore
        if (ctx.message?.video !== undefined) {
            //@ts-ignore
            telegram.getFileLink(ctx.message?.video.file_id).then(async url => {
                //@ts-ignore
                download(url.href, ctx.message?.video.file_id, "telegramImageCache", function () {
                    //@ts-ignore
                    files.push(`telegramImageCache/${ctx.message?.video.file_id}.${url.href.split('.').pop()}`);
                    //@ts-ignore
                    text = ctx.message?.caption || " ";
                    downloadEm.emit('photo');
                });
            });
        } else {
            downloadEm.emit('photo');
        }
}