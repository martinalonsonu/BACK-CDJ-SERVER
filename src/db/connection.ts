import { Sequelize } from "sequelize";
import fs from 'fs';
import path from 'path';

const sequelize = new Sequelize('cdj-back', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const seedDirectory = path.join(__dirname, 'seeders');

export const DBconnection = async () => {
    try {
        await sequelize.sync({ force: true });
        fs.readdirSync(seedDirectory).forEach((file) => {
            if (file.endsWith('.js')) {
                const seedFilePath = path.join(seedDirectory, file);
                require(seedFilePath);
            }
        });
        console.log('Sync successful');
    } catch (error) {
        console.error('Unable to connect to database', error);
    }
}

export default sequelize;
import './models-imports';



