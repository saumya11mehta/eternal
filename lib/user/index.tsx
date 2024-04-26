import { JsonObject } from "@prisma/client/runtime/library";
import axios from "axios";

export const checkUserExists = async (data:JsonObject) => {
    if(data){
        let result = await axios.post('/api/app/user/check_user',data);
        return result.data;
    }
}