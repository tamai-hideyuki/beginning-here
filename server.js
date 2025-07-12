import { createServer } from 'http';
import next from 'next';
import { startTimer, stopTimer } from './timerLogic.ts';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
let timerObj;

async function main() {
    await app.prepare();

    timerObj = await startTimer((remaining) => {
        console.log(`Remaining: ${remaining} ms`);
    });

    const server = createServer((req, res) => {
        if (req.url.startsWith('/api/timer')) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ remaining: timerObj.getRemaining().toString() }));
        } else {
            handle(req, res);
        }
    });

    server.listen(3040, () => {
        console.log('Ready on http://localhost:3040');
    });
}

function setupShutdownHooks() {
    const shutdown = async () => {
        console.log('Shutting down...');
        stopTimer(timerObj);
        process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}

main();
setupShutdownHooks();
