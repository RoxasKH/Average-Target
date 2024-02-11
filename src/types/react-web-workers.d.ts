declare module 'react-web-workers' {
    /**
     * Function that takes an array of files and returns an array of WebWorkers created using CreateWorker utility.
     * @param files Array of files to create WebWorkers for.
     * @returns Array of WebWorkers created from the provided files.
     */
    export default function WebWorker(files: (() => void)[]): Worker[];
}