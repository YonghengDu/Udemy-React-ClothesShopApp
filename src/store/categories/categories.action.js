import { async } from "@firebase/util";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { getCategoriesAndDocuments } from "../../utilities/fire-base/utility-firebase";

export const fetchCategotiesStart = () => 
({ type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START });

export const fetchCategotiesSUCCESS = (categoriesArr) => 
({ type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,payload:categoriesArr });

export const fetchCategotiesFailed = (error) => 
({ type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,payload:error });

export const fetchCategotiesAsync = () => async (dispatch) => {
    dispatch(fetchCategotiesStart());
    try{
        const categoryArray = await getCategoriesAndDocuments('categories');
        dispatch(fetchCategotiesSUCCESS(categoryArray));
    }catch(error){
        dispatch(fetchCategotiesFailed(error));
    }
}