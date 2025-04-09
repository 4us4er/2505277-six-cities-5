enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}
enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
}
const TIMEOUT_SHOW_ERROR = 2000;
export { AppRoute, APIRoute, TIMEOUT_SHOW_ERROR };
