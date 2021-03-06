// import { persistStore, autoRehydrate } from "redux-persist";
import { AsyncStorage, Platform } from "react-native";
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
        // compose(
        //     autoRehydrate()
        // ),
         applyMiddleware(thunk)
    );

    return store;
}