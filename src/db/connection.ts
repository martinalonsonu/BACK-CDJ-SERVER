import { Sequelize } from "sequelize";

const sequelize = new Sequelize('cdj-back', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

export const DBconnection = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Sync successful');
    } catch (error) {
        console.error('Unable to connect to database', error);
    }
}

export default sequelize;
import '../models/index.model';



