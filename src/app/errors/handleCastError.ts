import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError) : TGenericErrorResponse => {

}
export default handleCastError