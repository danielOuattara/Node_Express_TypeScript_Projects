/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Types } from "mongoose";
declare enum EnumStatus {
    INTERVIEW = "interview",
    DECLINED = "declined",
    PENDING = "pending"
}
declare enum EnumJobType {
    FULL_TIME = "full-time",
    PART_TIME = "part-time",
    REMOTE = "remote",
    INTERNSHIP = "internship"
}
interface IJob {
    company: string;
    position: string;
    status: EnumStatus;
    jobType: EnumJobType;
    jobLocation: string;
    createdBy: Types.ObjectId;
}
declare const _default: import("mongoose").Model<IJob, {}, {}, {}, import("mongoose").Document<unknown, {}, IJob> & IJob & {
    _id: Types.ObjectId;
}, any>;
export default _default;
