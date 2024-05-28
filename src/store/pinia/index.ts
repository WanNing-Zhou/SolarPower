
import {createPinia} from 'pinia'

const pinia = createPinia();

export const usePinia = (app: any)=> {
    app.use(pinia);
}
