export class Menu {
    r: HTMLDivElement;
    d: Document;
    b: HTMLBodyElement;
    c: HTMLElement | null;
    o: HTMLElement | null;
    constructor(root: HTMLDivElement) {
        this.r = root;
        this.d = document;
        this.b = this.d.body as HTMLBodyElement;
        this.c = this.d.querySelector('[data-menu="close"]');
        this.o = this.d.querySelector('[data-menu="open"]');
    }
    listen = () => {
        if(this.c && this.o) {
            this.c.addEventListener("click", (e) => {
                e.preventDefault();
                this.close();
            })
            this.o.addEventListener("click", (e) => {
                e.preventDefault();
                this.open();
            })
        }
    }
    open = () => {
        return;
        this.r.classList.add("is-open");
        this.b.style.overflow = "hidden";
    }
    close = () => {
        this.r.classList.remove("is-open");
        this.b.removeAttribute("style");
    }
}