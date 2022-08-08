import Sequelize from 'sequelize';

export const db = new Sequelize('MSPRPARKING', 'stanley.jesoph', 'y?D=3G3fP|6m', {
    host: 'mysql2.montpellier.epsi.fr',
    dialect: 'mysql',
    port: 5306
});

/*try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}*/