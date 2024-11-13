import { Column, Model, Table } from 'sequelize-typescript';

type CarAttributes = {
    make: string;
    model: string;
    year: number;
}

@Table({
    underscored: true
})
class Car extends Model<CarAttributes, CarAttributes> {
    @Column({})
    make: string;

    @Column({})
    model: string;

    @Column({})
    year: number;
}