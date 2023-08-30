import {handleTimer} from './module/shopOnline/timer.js';
import {addElements} from './module/shopOnline/createElement.js';
import {elemTypes as types} from './module/constants.js';

{
    const init = () => {
            const elems = [
                    {
                        type: types.section,
                        name: 'item'
                    },
                    {
                        type: types.section,
                        name: 'wholesale'
                    },
                    {
                        type: types.footer,
                        name: 'footer'
                    },
                ]
            ;
            
            addElements(elems);
            handleTimer();
        }
    ;
    
    init();
}
