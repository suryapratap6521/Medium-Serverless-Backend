"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upadateblogInput = exports.createblogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.createblogInput = zod_1.default.object({
    content: zod_1.default.string().optional(),
    title: zod_1.default.string(),
    published: zod_1.default.boolean(),
});
exports.upadateblogInput = zod_1.default.object({
    content: zod_1.default.string(),
    title: zod_1.default.string(),
    id: zod_1.default.string()
});
