import { makeAutoObservable } from "mobx";

export class LayoutService {

    private loaderCounter = 0;
    private footerCounter = 0;
    private headerCounter = 0;

    get hasLoader() {
        return this.loaderCounter > 0;
    };

    get hasFooter() {
        return this.footerCounter > 0;
    };

    get hasHeader() {
        return this.headerCounter > 0;
    };

    constructor() {
        makeAutoObservable(this);
    }

    setLoader = (loader: boolean) => {
        this.loaderCounter = Math.max(this.loaderCounter + (loader ? 1 : -1), 0);
    };
    
    setFooter = (footer: boolean) => {
        this.footerCounter = Math.max(this.footerCounter + (footer ? 1 : -1), 0);
    };

    setHeader = (header: boolean) => {
        this.headerCounter = Math.max(this.headerCounter + (header ? 1 : -1), 0);
    };

};

export default LayoutService;