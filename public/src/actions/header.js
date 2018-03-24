import  {TAB_CHANGED}  from '../utils/types';

export const userChangeTab = (index)=>({
    type:TAB_CHANGED,
    index
})
export const tabChanged = index =>dispatch => {
    dispatch(userChangeTab(index));
}