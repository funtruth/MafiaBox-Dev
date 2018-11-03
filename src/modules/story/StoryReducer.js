const initialState = {
    stories: [
        {
            key: 'inProgress',
            tag: 'In Progress',
        },
        {
            key: 'complete',
            tag: 'Complete',
        }
    ]   
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}