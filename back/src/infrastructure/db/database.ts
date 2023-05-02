import { Express } from 'express'

import { inject, injectable } from 'inversify';
import { DATABASE_CONFIG } from '../../core/types/db.types';

import { mongooseInit } from "./nosql-db"

import sequelizeAssociations from "./sql-associations";
import { sequelizeInit } from "./sql-db"

export interface DatabaseConfig {
    type: 'mysql' | 'mongo'
}

export interface IDatabase {
    connect(app: Express): Promise<void>
}

@injectable()
export class Database {
    constructor(@inject(DATABASE_CONFIG) private readonly config: DatabaseConfig) {}

    async connect(app: Express): Promise<void> {
        if (this.config.type === 'mongo') {
            return mongooseInit(app)
        }

        if (this.config.type === 'mysql') {
            sequelizeAssociations();
            return sequelizeInit(app)
        }

        throw new Error('Invalid configuration')
    }
}

