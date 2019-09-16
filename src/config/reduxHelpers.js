
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware
  } from 'react-navigation-redux-helpers';
  

 
  
  const reduxMiddleware = createReactNavigationReduxMiddleware(
    'root',
    (state) => state.nav,
  );
  console.log('---CS--reduxMiddleware',reduxMiddleware)
    const addListener = createReduxBoundAddListener('root');
  console.log('---CS--addListener',addListener)

/* *
 * @function: Configuring and creating redux store
 * */
//export const addListener = createReduxBoundAddListener('root');

export  {reduxMiddleware,addListener}
