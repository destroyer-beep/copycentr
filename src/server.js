import createApp from "./app/createApp.js";

async function initApp() {
    const app = createApp();
    await app.initApp();
}

await initApp();