export class DirectoryInfo {
    totalFilesize : number = 0;
    childDirectories : DirectoryInfo[];

    constructor() {
        this.childDirectories = [];
    }

    addToFilesize(filesize : number) : void {
        this.totalFilesize += filesize;
    }

    addChildDirectory(child : DirectoryInfo) : void {
        this.childDirectories.push(child);
    }

    getFilesize(recursive : boolean) : number {
        let filesize = this.totalFilesize;

        if (recursive) {
            this.childDirectories.forEach((child)=> {
                filesize += child.getFilesize(recursive);
            })
        }

        return filesize;
    }
}