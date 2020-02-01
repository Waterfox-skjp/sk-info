/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/',
    view: 'Home'
  },
  {
    path: '/information/',
    name: 'Information',
    view: 'Information'
  },
  {
    path: '/train-path/',
    name: 'Train Path',
    view: 'TrainPath'
  },
  {
    path: '/train-mileage/',
    name: 'Train Mileage',
    view: 'TrainMileage'
  },
  {
    path: '/path-details/',
    name: 'Path Details',
    view: 'PathDetails'
  }//,
  // {
  //   path: '/typography/',
  //   view: 'Typography'
  // },
  // {
  //   path: '/icons/',
  //   view: 'Icons'
  // },
  // {
  //   path: '/maps/',
  //   view: 'Maps'
  // },
  // {
  //   path: '/notifications/',
  //   view: 'Notifications'
  // }
]
