import { Sequelize, Model } from "sequelize-typescript";


const database = new Sequelize({
    dialect: 'postgres',
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    host: process.env.HOST,
});
