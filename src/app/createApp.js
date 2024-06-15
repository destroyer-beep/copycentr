import ServerApplication from "./app.js";
import ConfigService from "../core/config/config.service.js";

export default function createApp() {
    const configService = new ConfigService();

    return new ServerApplication(configService);
}