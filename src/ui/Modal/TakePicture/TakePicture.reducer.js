import { STORE_PICTURE } from './index';

const initialState = {
    file: null,
    image_string: null
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_PICTURE:
            return {
                file: action.payload.file,
                image_string: action.payload.image_string,
            }

        default: return state;
    }
}

export default Reducer;