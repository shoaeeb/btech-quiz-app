"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = __importDefault(require("./middleware/error-middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const departments_1 = __importDefault(require("./routes/departments"));
const quiz_1 = __importDefault(require("./routes/quiz"));
const subjects_1 = __importDefault(require("./routes/subjects"));
const results_1 = __importDefault(require("./routes/results"));
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Database Connected");
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: " http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/users", users_1.default);
app.use("/api/v1/departments", departments_1.default);
app.use("/api/v1/subjects", subjects_1.default);
app.use("/api/v1/quiz", quiz_1.default);
app.use("/api/v1/results", results_1.default);
app.use(error_middleware_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
