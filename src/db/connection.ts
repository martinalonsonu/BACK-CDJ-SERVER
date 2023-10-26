import { Sequelize } from "sequelize";
import fs from 'fs';
import path from 'path';

const sequelize = new Sequelize('cdj-back', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const seedDirectory = path.join(__dirname, 'seeders');
const modelDirectory = path.join(__dirname, '../models');

export const DBconnection = async () => {
    try {
        await sequelize.sync({ alter: true });
        fs.readdirSync(modelDirectory).forEach((file) => {
            if (file.endsWith('.js')) {
                const seedFilePath = path.join(modelDirectory, file);
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



