import {Umzug, SequelizeStorage} from 'umzug';

import jest from 'jest';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

const umzug = new Umzug({
    migrations: {
        glob: 'migrations/*.js',
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

try {
    umzug.up();
} catch (error) {
    umzug.down();
}
