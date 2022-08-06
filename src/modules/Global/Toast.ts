interface Severities {
    severity: string, 
    icon: string
}
type Severity = "error" | "warning" | "info" | "success";

export class Toast {
    private d: Document;
    private b: HTMLBodyElement;
    private root: HTMLElement | null;
    private inner: HTMLElement | null;
    private severities: Severities[];
    constructor(root: string) {
        this.d = document;
        this.b = this.d.body as HTMLBodyElement;
        this.root = this.d.querySelector(root);
        this.inner = this.root ? this.root.querySelector("div.dolar-toast_inner") : null;
        this.severities = [
            {severity: "error", icon: "error"},
            {severity: "warning", icon: "warning"},
            {severity: "success", icon: "check_circle"},
            {severity: "info", icon: "info"}
        ]
    }
    private open = (msg: string, severity: Severity, autoClose?: number | boolean): void => {
        if(this.root && this.inner) {
            this.severities.map((s) => {
                if(s.severity === severity) {
                    const i = this.d.createElement("div");
                    i.className = "dolar-toast_icon";
                    const mi = this.d.createElement("span");
                    mi.className = "material-symbols-outlined";
                    mi.innerHTML = s.icon;
                    i.appendChild(mi);
                    const m = this.d.createElement("div");
                    m.className = "dolar-toast_message";
                    m.innerHTML = msg;
                    this.inner?.appendChild(i)
                    this.inner?.appendChild(m)
                    this.root?.classList.add(`is-${s.severity}`);
                    this.root?.classList.add("is-open");
                    if(autoClose) {
                        const time = typeof autoClose === "number" ? autoClose : 1500;
                        setTimeout(() => {
                            this.close();
                        }, time);
                    }
                }
            })
        }
    }
    public close = () => {
        return new Promise((res, rej) => {
            if(this.root) {
                this.root.classList.remove("is-open");
                this.root.addEventListener("transitionend", () => {
                    if(!this.root?.classList.contains("is-open")) {
                        this.severities.forEach((s) => {
                            if(this.root) this.root.classList.remove(`is-${s.severity}`);
                        })
                        if(this.inner) this.inner.innerHTML = "";
                        res(true);
                    }
                })
            }
        })
    }
    public error = (msg: string, autoClose?: number | boolean) => {
        this.open(msg, "error", autoClose);
    }
    public success = (msg: string, autoClose?: number | boolean) => {
        this.open(msg, "success", autoClose);
    }
    public warning = (msg: string, autoClose?: number | boolean) => {
        this.open(msg, "warning", autoClose);
    }
    public info = (msg: string, autoClose?: number | boolean) => {
        this.open(msg, "info", autoClose);
    }
}