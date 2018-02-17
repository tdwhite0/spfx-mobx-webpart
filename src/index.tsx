
import { observable, ObservableMap, autorun } from 'mobx';
import * as React from "react";
import * as ReactDom from 'react-dom';
import { Provider } from "mobx-react";

export type Constructor<T = any> = new (...args: any[]) => T;

export class WebpartStore {
    @observable public properties = observable.map();
}

export interface IStore {
    webpart: WebpartStore;
}
export class Store implements IStore {
    public webpart = new WebpartStore();
}

export function ObservableWebPart<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        timestamp = Date.now();

        public store: Store = new Store();

        constructor(...args: any[]) {
            super(...args);
            this.getPropertyPaneConfiguration = () => {
                return super.getPropertyPaneConfiguration();
            }

            this.onPropertyPaneFieldChanged = (targetProperty, oldValue, newValue) => {
                this.store.webpart.properties.set(targetProperty, newValue);
                return super.onPropertyPaneFieldChanged(targetProperty, oldValue, newValue);
            }
        }

        onInit() {
            return super.onInit().then(() => {
                this.store.webpart.properties.clear();
                this.store.webpart.properties.merge(this.properties as {});
                return Promise.resolve(true);
            });
        }
    }
}

export function ObservableWebPartWithReactComponent<TBase extends Constructor>(Base: TBase, Component) {
    return class extends Base {

        public store: Store = new Store();

        constructor(...args: any[]) {

            super(...args);

            this.onPropertyPaneFieldChanged = (targetProperty, oldValue, newValue) => {
                this.store.webpart.properties.set(targetProperty, newValue);
                return super.onPropertyPaneFieldChanged(targetProperty, oldValue, newValue);
            }
        }

        public render(): void {
            if (this.renderedOnce) {
                return;
            }

            ReactDom.render(
                <Provider stores={{ webpart: this.store }}>
                    <Component />
                </Provider>, this.domElement);
        }

        onInit() {
            return super.onInit().then(() => {
                this.store.webpart.properties.clear();
                this.store.webpart.properties.merge(this.properties as {});

                return Promise.resolve(true);
            });
        }

        onPropertyPaneFieldChanged(targetProperty, oldValue, newValue) {
            this.store.webpart.properties.set(targetProperty, newValue);
            return super.onPropertyPaneFieldChanged(targetProperty, oldValue, newValue);
        }
    }
}