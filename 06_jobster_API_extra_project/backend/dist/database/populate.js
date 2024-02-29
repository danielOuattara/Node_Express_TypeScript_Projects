"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./../../.env" });
const connect_1 = require("./connect");
const JobModel_1 = __importDefault(require("./../models/JobModel"));
const mock_data_json_1 = __importDefault(require("./mock-data.json"));
const mongoose_1 = __importDefault(require("mongoose"));
function populateDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connect_1.connectToDB)(process.env.MONGO_URI);
            console.log("Connection Success: ready to populate !");
            yield JobModel_1.default.deleteMany({});
            console.log("Previous data deleted successfully.");
            yield JobModel_1.default.create(mock_data_json_1.default);
            console.log("Populate: Success !");
            yield mongoose_1.default.connection.close();
            process.exit(0);
        }
        catch (error) {
            console.error("Error occurred during population:", error);
            process.exit(1);
        }
    });
}
populateDatabase();
