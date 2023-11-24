import Sequelize from 'sequelize';

const password = process.env.PASSWORDPS
export const sequelize = new Sequelize('apiclinicalop', 'fl0user', 'password', {
    host: 'ep-shiny-brook-53488213.eu-central-1.aws.neon.fl0.io',
    dialect:'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});