"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = __importDefault(require("./services/database-service"));
// import express from "express";
database_service_1.default.connect()
    .then((connection) => {
    // Initialize app
})
    .catch((error) => console.log(error));
//# sourceMappingURL=main.js.map