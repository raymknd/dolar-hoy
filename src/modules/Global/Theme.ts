export class Theme {
    d: Document;
    w: Window;
    b: HTMLBodyElement;
    mdt: MediaQueryList;
    button: HTMLElement | null;
    constructor() {
        this.d = document;
        this.w = window;
        this.b = this.d.body as HTMLBodyElement;
        this.mdt = this.w.matchMedia('(prefers-color-scheme: dark)');
        this.button = this.d.querySelector('[data-settheme]');
    }
    listen = () => {
        if(this.mdt.matches) this.setDarkMode();

        this.mdt.addEventListener("change", () => {
            const isDark = this.mdt.matches ? true : false;
            if(isDark) this.setDarkMode();
            else this.removeDarkMode();
        })

        if(this.button) {
            const icon = this.button.querySelector("span");
            this.button.addEventListener("click", (e) => {
                e.preventDefault();
                if(this.IsDark()) {
                    this.removeDarkMode();
                    if(icon) icon.innerHTML = "dark_mode";
                }
                else {
                    this.setDarkMode();
                    if(icon) icon.innerHTML = "light_mode";
                }
            })
        }
    }
    setDarkMode = () => {
        if(!this.IsDark()) this.b.classList.add("dark-mode");
    }
    removeDarkMode = () => {
        if(this.IsDark()) this.b.classList.remove("dark-mode");
    }
    IsDark = () => {
        const isDark = this.b.classList.contains("dark-mode");
        return isDark ? true : false;
    }
}