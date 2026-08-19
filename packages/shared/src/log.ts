// packages/lib/src/log.ts
import * as fs from 'node:fs';
import { LOG_PATH } from './path';
import type { LogState, PkgName } from './types/log.types';

//EXAMPLE: [Error](Stethoscope): Failed to get config...
// FORMAT: [State](Package): logging message

//This function is to write logs to the logging file in the Silhouette home dir when DEBUG is false or just log it to console when otherwise

const debug = false; // Set to false to test the file-writing logic

export function logger(type: LogState, pkgName: PkgName, message: string) {
    if (debug) {
        console.log(`[${type}](${pkgName}): ${message}`);
    } else {
        const logMessage = `[${type}](${pkgName}): ${message}\n`;
        try {
            // Fix: Use appendFileSync for pure synchronous logging in Bun
            fs.appendFileSync(LOG_PATH, logMessage);

        } catch (error) {
            console.error(`Failed to write log to file: ${error}`);
        }
    }
}
