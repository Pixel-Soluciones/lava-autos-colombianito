import app from './app.js'
import { PORT } from './utils/config.js'
import { info, error } from './utils/logger.js'

app.listen(PORT || 3000, () => {
    info(`Server running on port ${PORT || 3000}`);
});
