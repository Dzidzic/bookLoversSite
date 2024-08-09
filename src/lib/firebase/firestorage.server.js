import { PUBLIC_STORAGE_BUCKET } from "$env/static/public";
import { storage } from "./firebase.server";
import { tmpdir } from 'os';
import fs from 'fs';
import path from "path";
import { v4 as uuid4 } from 'uuid';

/**
 * @param {string} destination
 * @param {File} file
 */
export async function saveFileToBuccket(file, destination) {
    const filePath = await saveFileToDisk(file);
    const uploadResult = await storage.bucket(PUBLIC_STORAGE_BUCKET).upload(filePath, {destination, public: true});

    //  Toggle betwen public and private
    //
    // await storage.bucket(PUBLIC_STORAGE_BUCKET)
    //     .file(destination)
    //     .makePrivate();

    //  Download for certain ammount of time
    //
    // await storage.bucket(PUBLIC_STORAGE_BUCKET)
    //     .file(destination)
    //     .getSignedUrl({ expires: new Date('2023-07-07'), action: 'read'})''

    return uploadResult[0].publicUrl();
}

/**
 * @param {File} file
 */
async function saveFileToDisk(file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(tmpdir(), uuid4());

    fs.writeFileSync(filePath, buffer, 'base64');
    return filePath;
}