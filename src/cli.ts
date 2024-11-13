import { parseArgs } from "node:util";
import fs from "node:fs";
import path from "node:path";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Dialect } from "sequelize";
import { DialectPostgres } from "sequelize-typescript-generator";

const args = parseArgs({
  options: {
    host: {
        type: "string",
        short: "h",
        default: "localhost",
    },
    port: {
        type: "string",
        short: "p",
        default: "5432",
    },
    database: {
      type: "string",
      short: "db",
    },
    username: {
        type: "string",
        short: "u",
    },
    password: {
        type: "string",
        short: "pw",
    },
    dialect: {
        type: "string",
        short: "d",
        default: "postgres"
    },
    migrationsPath: {
        type: "string",
        short: "m",
        default: "./migrations"
    },
    modelsPaths: {
      type: "string",
      short: "mo",
      default: "./models"
    }
  }
});


const getDbSchemaFromDb = () => {

}

const getDbSchemaFromModels = () => {


}

const diffSchemas = () => {

}

const generateMigration = () => {
  let contents = `'use strict';
  
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    ${methods}
  },

  async down (queryInterface, Sequelize) {
    ${reverseMethods}
  }
};
`
  return contents;
}

const options: SequelizeOptions = {
    database: args.values.database,
    host: args.values.host,
    port: Number.parseInt(args?.values?.port || '5432'),
    dialect: args.values.dialect as Dialect || 'postgres',
    username: args.values.username,
    password: args.values.password,
    models: [],
};

const migrationsPath = args.values.migrationsPath || './';
const files = fs.readdirSync(migrationsPath);
console.log(files);
const db = new Sequelize(options);
const META_TABLE = 'SequelizeMeta';
db.query(`SELECT * FROM ${META_TABLE}`);

const j  = new DialectPostgres();
const dbSchemaFromDb = getDbSchemaFromDb();
const dbSchemaFromModels = getDbSchemaFromModels();
const schemaDiff = diffSchemas(dbSchemaFromDb, dbSchemaFromModels);
const migration = generateMigration(schemaDiff);
fs.writeFileSync(path.join(migrationsPath, '.js'), migration, {});