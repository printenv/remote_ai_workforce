"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./midlleware/errorHandler"));
const openai_1 = __importDefault(require("./routes/openai"));
const azure_1 = __importDefault(require("./routes/azure"));
const wp_1 = __importDefault(require("./routes/wp"));
const init_1 = __importDefault(require("./wp/init"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/api/openai/", openai_1.default);
app.use("/api/azure", azure_1.default);
app.use("/api/wp", wp_1.default);
app.use(errorHandler_1.default);
(0, init_1.default)();
app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});
