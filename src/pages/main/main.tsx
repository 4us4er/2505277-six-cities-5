import { Cities } from '../../components/cities/cities';
import { CitiesList } from '../../components/cities-list/cities-list';
import { AuthorizationStatus } from '../../const/auth';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { getAuthorizatinStatus } from '../../store/user-process/selectors';

function Main(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizatinStatus);
  const dispatch = useAppDispatch();
  const email = localStorage.getItem('userEmail');
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to="/favorites"
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          {email}
                        </span>
                        <span className="header__favorite-count">3</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a
                        className="header__nav-link"
                        href="#"
                        onClick={() => {
                          dispatch(logoutAction());
                        }}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="header__nav-item user">
                      <a
                        className="header__nav-link header__nav-link--profile"
                        href="#"
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      </a>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to="/login">
                        <span className="header__login">Login</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <Cities />
      </main>
    </div>
  );
}

export { Main };
