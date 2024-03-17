import React from 'react';
import { Provider } from 'react-redux';
// import store from './redux/store';
import store from './redux/redux1/store1';
// import Counter from './redux/Counter';
// import Counter1 from './redux/Counter1';
import Addition from './redux/redux1/Addition';
function App(){
    return(
       <Provider store={store}>
        <div>
        {/* <Counter/>
        <Counter1/> */}
        <Addition/>
        </div>
       </Provider>
    )
}
export default App