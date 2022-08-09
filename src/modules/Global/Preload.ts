export class Preload {
    image: HTMLImageElement;
    loaded: string[];
    constructor() {
        this.image = new Image();
        this.loaded = [];
    }
    preload(imgs: string[]): Promise<string[]> {
        return new Promise((res, rej) => {
            for (var i = 0; i < imgs.length; i++) {
                var img = new Image();
                img.src = imgs[i];
                img.onload = () => {
                    this.loaded.push(img.src)
                }
            }
            res(this.loaded)
        })
    }
}