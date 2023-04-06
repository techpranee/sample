/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'FfylhhlAanYnOR1',
      'isDeleted':false,
      'email':'Deshaun_Stamm@hotmail.com',
      'contact.phone':89292,
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'email':'Deshaun_Stamm@hotmail.com' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'8fw_WjOL8D29Oez',
      'isDeleted':false,
      'email':'Josefina90@gmail.com',
      'contact.phone':73829,
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'email':'Josefina90@gmail.com' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'nLXBA_dmlQnaV6_',
      'isDeleted':false,
      'email':'Sarai.Flatley@yahoo.com',
      'contact.phone':66311,
      'userType':authConstant.USER_TYPES.Cleaner
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let cleaner = await dbService.updateOne(User, { 'email':'Sarai.Flatley@yahoo.com' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'6TekeZEbMPoUiFv',
      'isDeleted':false,
      'email':'Angelina.Lindgren@hotmail.com',
      'contact.phone':76847,
      'userType':authConstant.USER_TYPES.Hub
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let hub = await dbService.updateOne(User, { 'email':'Angelina.Lindgren@hotmail.com' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'Hub', 'Cleaner', 'User', 'Admin', 'System_User' ];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes  && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/cleanerapp/api/v1/addon/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/addon/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/addon/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/addon/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/addon/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/addon/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/addon/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/addon/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/addon/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/addon/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/addon/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/addon/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/addon/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/addon/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/car/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/car/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/car/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/car/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/car/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/car/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/car/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/car/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/car/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/car/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/car/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/car/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/car/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/car/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/car/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/car/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/car/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/car/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/cleaner/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/cleaner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/:id',
        role: 'Hub',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/complaint/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/complaint/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/complaint/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/complaint/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/complaint/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/complaint/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/complaint/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/complaint/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/complaint/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/complaint/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/complaint/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/complaint/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/hub/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/hub/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/hub/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/hub/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/hub/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/hub/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/hub/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/hub/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/hub/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/hub/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/hub/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/hub/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/hub/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/hub/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/hub/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/hub/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/hub/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/hub/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/package/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/package/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/package/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/package/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/package/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/package/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/package/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/package/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/package/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/package/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/package/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/package/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/payment/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/payment/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/payment/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/payment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/payment/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/payment/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/payment/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/payment/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/payment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/payment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/payment/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/payment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/:id',
        role: 'Hub',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/subscription/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/subscription/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/subscription/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/subscription/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/subscription/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/subscription/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/subscription/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/subscription/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/subscription/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/subscription/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/subscription/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/subscription/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/user/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/user/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/user/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/user/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/user/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/user/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/user/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/user/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/wash/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/wash/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/wash/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/wash/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/wash/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/cleanerapp/api/v1/wash/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/wash/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/cleanerapp/api/v1/wash/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wash/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/wash/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/wash/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/wash/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/wash/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/wash/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wash/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/banner/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/banner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/banner/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/banner/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/banner/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/banner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/banner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/banner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/banner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/banner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/banner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/banner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wallet/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wallet/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wallet/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wallet/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/wallet/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/wallet/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wallet/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wallet/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wallet/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wallet/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/wallet/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/wallet/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/cleanerapp/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/cleanerapp/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/cleanerapp/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/cleanerapp/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/addon/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/addon/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/addon/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/addon/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/addon/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/addon/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/addon/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/addon/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/addon/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/addon/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/addon/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/addon/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/addon/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/addon/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/addon/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/addon/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/addon/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/addon/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/addon/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/addon/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/addon/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/car/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/car/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/car/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/car/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/car/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/car/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/car/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/car/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/car/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/car/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/car/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/car/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/car/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/userapp/api/v1/car/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/userapp/api/v1/car/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/car/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/car/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/car/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/car/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/car/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/car/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/car/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/car/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/car/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/car/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/cleaner/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/cleaner/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/cleaner/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/cleaner/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/cleaner/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/cleaner/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/cleaner/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/cleaner/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/cleaner/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/cleaner/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/cleaner/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/cleaner/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/cleaner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/cleaner/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/cleaner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/complaint/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/complaint/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/complaint/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/complaint/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/complaint/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/complaint/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/complaint/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/complaint/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/complaint/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/complaint/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/complaint/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/complaint/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/hub/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/hub/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/hub/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/hub/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/hub/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/hub/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/hub/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/hub/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/hub/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/hub/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/hub/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/hub/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/hub/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/userapp/api/v1/hub/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/userapp/api/v1/hub/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/hub/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/hub/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/hub/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/hub/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/hub/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/hub/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/hub/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/hub/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/hub/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/hub/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/package/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/package/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/package/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/package/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/package/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/package/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/package/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/package/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/package/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/package/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/package/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/package/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/package/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/package/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/package/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/payment/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/payment/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/payment/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/payment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/payment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/payment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/payment/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/payment/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/payment/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/payment/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/payment/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/payment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/payment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/payment/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/payment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/:id',
        role: 'Hub',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/subscription/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/subscription/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/subscription/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/subscription/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/subscription/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/subscription/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/subscription/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/subscription/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/subscription/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/subscription/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/subscription/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/subscription/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/user/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/user/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/user/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/user/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/user/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/wash/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/wash/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/wash/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/userapp/api/v1/wash/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/wash/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/userapp/api/v1/wash/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wash/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/wash/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/wash/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/wash/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/wash/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/wash/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wash/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/banner/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/banner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/banner/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/banner/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/banner/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/banner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/banner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/banner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/banner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/banner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/banner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/banner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wallet/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wallet/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wallet/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wallet/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/wallet/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/wallet/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wallet/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wallet/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wallet/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wallet/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/wallet/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/wallet/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/userapp/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/userapp/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/userapp/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/userapp/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/addon/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/addon/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/addon/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/addon/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/addon/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/addon/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/addon/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/addon/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/addon/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/addon/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/addon/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/addon/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/addon/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/addon/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/addon/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/car/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/car/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/car/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/car/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/car/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/car/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/car/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/car/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/car/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/car/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/car/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/car/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/car/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/car/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/car/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/car/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/car/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/car/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/car/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/car/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/car/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/cleaner/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/cleaner/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/cleaner/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/cleaner/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/cleaner/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/cleaner/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/cleaner/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/cleaner/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/cleaner/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/cleaner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/cleaner/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/cleaner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/:id',
        role: 'Hub',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/complaint/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/complaint/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/complaint/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/complaint/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/complaint/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/complaint/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/complaint/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/complaint/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/complaint/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/complaint/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/complaint/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/complaint/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/hub/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/hub/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/hub/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/hub/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/hub/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/hub/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/hub/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/hub/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/hub/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/hub/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/hub/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/hub/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/hub/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/hub/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/hub/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/hub/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/hub/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/hub/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/hub/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/hub/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/hub/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/package/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/package/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/package/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/package/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/package/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/package/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/package/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/package/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/package/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/package/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/package/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/package/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/payment/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/payment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/payment/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/payment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/payment/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/payment/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/payment/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/payment/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/payment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/payment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/payment/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/payment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/create',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/list',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/:id',
        role: 'Hub',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/subscription/:id',
        role: 'Cleaner',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/subscription/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/subscription/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/subscription/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/subscription/count',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/subscription/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/subscription/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/subscription/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/subscription/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/subscription/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/subscription/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/subscription/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/user/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/user/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/user/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/user/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/user/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/user/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/user/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/user/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/user/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/wash/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/addbulk',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/wash/list',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/wash/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/wash/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/wash/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/wash/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/wash/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/dashboard/api/v1/wash/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/wash/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/wash/count',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/dashboard/api/v1/wash/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/updatebulk',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wash/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/wash/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/wash/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/wash/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/wash/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/wash/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wash/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/banner/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/banner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/banner/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/banner/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/banner/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/banner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/banner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/banner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/banner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/banner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/banner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/banner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wallet/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wallet/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wallet/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wallet/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/wallet/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/wallet/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wallet/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wallet/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wallet/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wallet/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/wallet/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/wallet/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/dashboard/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/dashboard/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/dashboard/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/dashboard/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/addon/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/addon/create',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/addon/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/addon/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/addon/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/addon/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/addon/addbulk',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/addon/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/addon/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/addon/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/addon/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/addon/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/addon/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/addon/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/addon/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/addon/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/admin/addon/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/admin/addon/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/addon/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/addon/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/addon/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/addon/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/addon/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/addon/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/addon/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/addon/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/update/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/addon/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/admin/addon/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/addon/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/addon/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/addon/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/addon/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/updatebulk',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/addon/softdelete/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/addon/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/addon/softdeletemany',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/addon/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/addon/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/addon/delete/:id',
        role: 'Hub',
        method: 'DELETE' 
      },
      {
        route: '/admin/addon/delete/:id',
        role: 'Cleaner',
        method: 'DELETE' 
      },
      {
        route: '/admin/addon/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/addon/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/addon/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/addon/deletemany',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/addon/deletemany',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/addon/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/addon/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/addon/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/car/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/car/create',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/car/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/car/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/car/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/car/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/car/addbulk',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/car/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/car/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/car/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/car/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/car/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/car/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/car/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/car/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/car/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/admin/car/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/admin/car/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/car/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/car/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/car/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/car/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/car/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/car/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/car/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/car/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/car/update/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/car/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/car/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/car/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/car/partial-update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/car/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/car/partial-update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/car/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/car/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/car/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/car/updatebulk',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/car/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/car/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/car/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/car/softdelete/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/car/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/car/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/car/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/car/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/car/softdeletemany',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/car/softdeletemany',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/car/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/car/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/car/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/car/delete/:id',
        role: 'Hub',
        method: 'DELETE' 
      },
      {
        route: '/admin/car/delete/:id',
        role: 'Cleaner',
        method: 'DELETE' 
      },
      {
        route: '/admin/car/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/car/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/car/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/car/deletemany',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/car/deletemany',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/car/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/car/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/car/deletemany',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/create',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/addbulk',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cleaner/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/admin/cleaner/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/admin/cleaner/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/cleaner/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/cleaner/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/cleaner/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/update/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/updatebulk',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/softdelete/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/softdeletemany',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cleaner/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cleaner/delete/:id',
        role: 'Hub',
        method: 'DELETE' 
      },
      {
        route: '/admin/cleaner/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/admin/cleaner/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/cleaner/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/cleaner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/cleaner/deletemany',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/deletemany',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cleaner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/complaint/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/create',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/complaint/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/addbulk',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/complaint/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/admin/complaint/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/admin/complaint/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/complaint/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/complaint/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/complaint/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/complaint/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/complaint/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/complaint/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/complaint/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/complaint/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/complaint/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/complaint/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/complaint/delete/:id',
        role: 'Hub',
        method: 'DELETE' 
      },
      {
        route: '/admin/complaint/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/admin/complaint/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/complaint/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/complaint/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/complaint/deletemany',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/admin/complaint/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/complaint/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/hub/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/hub/create',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/hub/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/hub/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/hub/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/hub/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/hub/addbulk',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/hub/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/hub/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/hub/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/hub/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/hub/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/hub/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/hub/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/hub/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/hub/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/admin/hub/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/admin/hub/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/hub/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/hub/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/hub/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/hub/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/hub/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/hub/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/hub/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/hub/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/update/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/partial-update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/hub/partial-update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/hub/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/hub/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/updatebulk',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/softdelete/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/hub/softdeletemany',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/softdeletemany',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/hub/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/hub/delete/:id',
        role: 'Hub',
        method: 'DELETE' 
      },
      {
        route: '/admin/hub/delete/:id',
        role: 'Cleaner',
        method: 'DELETE' 
      },
      {
        route: '/admin/hub/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/hub/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/hub/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/hub/deletemany',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/hub/deletemany',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/hub/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/hub/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/hub/deletemany',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/package/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/package/create',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/package/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/package/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/package/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/package/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/package/addbulk',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/package/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/package/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/package/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/package/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/package/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/package/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/package/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/package/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/package/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/admin/package/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/admin/package/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/package/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/package/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/package/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/package/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/package/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/package/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/package/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/package/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/package/update/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/package/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/package/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/package/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/package/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/admin/package/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/package/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/package/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/package/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/package/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/package/updatebulk',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/package/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/package/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/package/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/package/softdelete/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/package/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/package/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/package/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/package/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/package/softdeletemany',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/package/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/package/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/package/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/package/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/package/delete/:id',
        role: 'Hub',
        method: 'DELETE' 
      },
      {
        route: '/admin/package/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/admin/package/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/package/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/package/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/package/deletemany',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/package/deletemany',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/package/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/package/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/package/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/payment/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/payment/create',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/payment/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/payment/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/payment/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/payment/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/payment/addbulk',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/payment/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/payment/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/payment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/payment/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/payment/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/payment/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/payment/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/payment/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/payment/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/admin/payment/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/admin/payment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/payment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/payment/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/payment/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/payment/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/payment/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/payment/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/payment/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/payment/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/update/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/payment/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/admin/payment/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/payment/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/payment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/payment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/payment/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/updatebulk',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/payment/softdelete/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/payment/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/payment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/payment/softdeletemany',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/payment/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/payment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/payment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/payment/delete/:id',
        role: 'Hub',
        method: 'DELETE' 
      },
      {
        route: '/admin/payment/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/admin/payment/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/payment/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/payment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/payment/deletemany',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/payment/deletemany',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/payment/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/payment/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/payment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subscription/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/create',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/admin/subscription/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subscription/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/addbulk',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/admin/subscription/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subscription/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subscription/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/admin/subscription/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/admin/subscription/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/subscription/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/subscription/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/subscription/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/subscription/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/subscription/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/subscription/update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/partial-update/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/subscription/updatebulk',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/softdelete/:id',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/softdeletemany',
        role: 'Hub',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/softdeletemany',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/subscription/delete/:id',
        role: 'Hub',
        method: 'DELETE'
      },
      {
        route: '/admin/subscription/delete/:id',
        role: 'Cleaner',
        method: 'DELETE'
      },
      {
        route: '/admin/subscription/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/admin/subscription/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/subscription/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/subscription/deletemany',
        role: 'Hub',
        method: 'POST'
      },
      {
        route: '/admin/subscription/deletemany',
        role: 'Cleaner',
        method: 'POST'
      },
      {
        route: '/admin/subscription/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/admin/subscription/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/subscription/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Hub',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Cleaner',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wash/create',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/wash/create',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/wash/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/wash/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wash/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wash/addbulk',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/wash/addbulk',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/wash/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/wash/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wash/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wash/list',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/wash/list',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/wash/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/wash/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wash/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wash/:id',
        role: 'Hub',
        method: 'GET' 
      },
      {
        route: '/admin/wash/:id',
        role: 'Cleaner',
        method: 'GET' 
      },
      {
        route: '/admin/wash/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/wash/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/wash/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/wash/count',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/wash/count',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/wash/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/wash/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wash/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wash/update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/update/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/partial-update/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/partial-update/:id',
        role: 'Cleaner',
        method: 'PUT'
      },
      {
        route: '/admin/wash/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/wash/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/wash/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wash/updatebulk',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/updatebulk',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/softdelete/:id',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/softdelete/:id',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wash/softdeletemany',
        role: 'Hub',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/softdeletemany',
        role: 'Cleaner',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/wash/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wash/delete/:id',
        role: 'Hub',
        method: 'DELETE' 
      },
      {
        route: '/admin/wash/delete/:id',
        role: 'Cleaner',
        method: 'DELETE' 
      },
      {
        route: '/admin/wash/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/wash/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/wash/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/wash/deletemany',
        role: 'Hub',
        method: 'POST' 
      },
      {
        route: '/admin/wash/deletemany',
        role: 'Cleaner',
        method: 'POST' 
      },
      {
        route: '/admin/wash/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/wash/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/wash/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/banner/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/banner/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/banner/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/banner/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/banner/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/banner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/banner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/wallet/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/wallet/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/wallet/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallet/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallet/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallet/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallet/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/wallet/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/wallet/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'Hub', 'Cleaner', 'User', 'Admin', 'System_User' ];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'email':'Deshaun_Stamm@hotmail.com',
      'password':'FfylhhlAanYnOR1'
    },{
      'email':'Josefina90@gmail.com',
      'password':'8fw_WjOL8D29Oez'
    },{
      'email':'Sarai.Flatley@yahoo.com',
      'password':'nLXBA_dmlQnaV6_'
    },{
      'email':'Angelina.Lindgren@hotmail.com',
      'password':'6TekeZEbMPoUiFv'
    }];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN')._id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER')._id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER')._id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();

};
module.exports = seedData;