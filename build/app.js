"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4000;
require("./model/index");
app.get("/", (req, res) => {
    res.send("hello world");
});
app.get("/about", (req, res) => {
    res.send("about");
});
app.get("/contact", (req, res) => {
    res.send("contact page");
});
app.listen(port, () => {
    console.log("server running at ", port);
});
