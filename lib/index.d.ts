import { ObservableMap } from 'mobx';
export declare type Constructor<T = any> = new (...args: any[]) => T;
export declare class WebpartStore {
    properties: ObservableMap<{}>;
    context: any;
}
export interface IStore {
    webpart: WebpartStore;
}
export declare class Store implements IStore {
    webpart: WebpartStore;
}
export declare function makeObservableWebPart<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        [x: string]: any;
        timestamp: number;
        store: Store;
        onInit(): any;
    };
} & TBase;
export declare function connectWebPartWithReactComponent<TBase extends Constructor>(Base: TBase, Component: any): {
    new (...args: any[]): {
        [x: string]: any;
        store: Store;
        render(): void;
        onInit(): any;
        onPropertyPaneFieldChanged(targetProperty: any, oldValue: any, newValue: any): any;
    };
} & TBase;
export declare function withPropertyPaneConfig<TBase extends Constructor>(Base: TBase, propertyPaneConfig: any): {
    new (...args: any[]): {
        [x: string]: any;
        _propertyPaneConfig: ObservableMap<{}>;
        getPropertyPaneConfiguration(): any;
    };
} & TBase;
