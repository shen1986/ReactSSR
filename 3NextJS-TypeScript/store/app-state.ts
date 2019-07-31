import { observable, computed, action, autorun } from 'mobx';

class AppState {
    constructor({ count, name }: any = { count: 0, name: 'shenxf' }) {
        this.count = count;
        this.name = name;
    }

    @observable private count: number;

    @observable private name: string;

    @computed
    get msg() {
        return `${this.name} say count is ${this.count}`;
    }

    @action
    public add(num?: number) {
        if (num) {
            this.count += num;
        } else {
            this.count += 1;
        }
    }

    @action
    public changeName(name: string): void {
        this.name = name;
    }
}

export default AppState;
