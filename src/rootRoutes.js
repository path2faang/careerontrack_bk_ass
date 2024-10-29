import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from './middlewares/errorMiddleware.js';
import conversationRoutes from "./routes/conversationRoutes.js";

export default (app) => {
    app.use(authRoutes);
    app.use(conversationRoutes);
    app.use(errorMiddleware);
}