import { Sequelize, DataTypes, STRING } from 'sequelize'; // ES module import


const sequelize = new Sequelize('todo_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.TEXT,
    allowNull:true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

sequelize.sync();

export { sequelize, Task };
