import { applyMiddleware, createStore } from "redux";
 import thunk from "redux-thunk";
import reducer from "../redux";

/* *
 * @function: Configuring and creating redux store 
 * */
export default function configureStore() {

    /* *
     * @function: Creating redux store
     * */
    const store = createStore(
        reducer(),
         applyMiddleware(thunk)
    );

    return store;
}