import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import NavLink from '../Components/NavLink';
import ResponsiveNavLink from '../Components/ResponsiveNavLink';
import ApplicationMark from '../Components/ApplicationMark';
import Dropdown from '../Components/Dropdown';
import DropdownLink from '../Components/DropdownLink';
import usePreventDefault from '../Hooks/usePreventDefault';
import { Team } from '../types/types';
type Props = {
  header?: string | React.ReactNode;
};
const AppLayout: React.FC<Props> = ({ header, children }) => {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [bannerToggle, setBannerToggle] = useState(false);
  //@ts-ignore
  const { user, jetstream, flash } = usePage().props;
  const allTeams = user.allTeams;
  const currentTeam = user.current_team;
  useEffect(() => {
    if (flash.message) {
      setBannerToggle(true);
    }
  }, [flash]);
  const switchToTeam = (team: any) => {
    Inertia.put(
      //@ts-ignore
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      }
    );
  };

  const logout = () => {
    //@ts-ignore
    Inertia.post(route('logout'));
  };
  return (
    <div>
      <Banner on={bannerToggle} message={flash.message} onClose={() => setBannerToggle(false)} />
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white border-b border-gray-100">
          {/* <!-- Primary Navigation Menu --> */}
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {/* <!-- Logo --> */}
                <div className="flex items-center flex-shrink-0">
                  {/* @ts-ignore */}
                  <InertiaLink href={route('dashboard')}>
                    <ApplicationMark className="block w-auto h-9" />
                  </InertiaLink>
                </div>

                {/* <!-- Navigation Links --> */}
                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                  {/* @ts-ignore */}
                  <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                    Dashboard
                  </NavLink>
                </div>
              </div>

              <div className="hidden sm:flex sm:items-center sm:ml-6">
                <div className="relative ml-3">
                  {/* <!-- Teams Dropdown --> */}
                  {jetstream.hasTeamFeatures && (
                    <Dropdown
                      align="right"
                      width="60"
                      trigger={
                        <span className="inline-flex rounded-md">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition bg-white border border-transparent rounded-md hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50"
                          >
                            {user.current_team.name}

                            <svg
                              className="ml-2 -mr-0.5 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      }
                    >
                      <div className="w-60">
                        {/* <!-- Team Management --> */}
                        {jetstream.hasTeamFeatures && (
                          <>
                            <div className="block px-4 py-2 text-xs text-gray-400">Manage Team</div>

                            {/* <!-- Team Settings --> */}
                            {/* @ts-ignore */}
                            <DropdownLink href={route('teams.show', user.current_team)}>Team Settings</DropdownLink>
                            {jetstream.canCreateTeams && (
                              // @ts-ignore
                              <DropdownLink href={route('teams.create')}>Create New Team</DropdownLink>
                            )}
                            <div className="border-t border-gray-100"></div>
                            {/* <!-- Team Switcher --> */}
                            <div className="block px-4 py-2 text-xs text-gray-400">Switch Teams</div>
                            {allTeams &&
                              allTeams.map((team: Team) => {
                                <form onSubmit={() => switchToTeam(team)} key={team.id}>
                                  <DropdownLink as="button">
                                    <div className="flex items-center">
                                      <svg
                                        v-if="team.id == $page.props.user.current_team_id"
                                        className="w-5 h-5 mr-2 text-green-400"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                      </svg>
                                      <div>{team.name}</div>
                                    </div>
                                  </DropdownLink>
                                </form>;
                              })}
                          </>
                        )}
                      </div>
                    </Dropdown>
                  )}
                </div>

                {/* <!-- Settings Dropdown --> */}
                <div className="relative ml-3">
                  <Dropdown
                    align="right"
                    width="48"
                    trigger={
                      jetstream.managesProfilePhotos ? (
                        <button className="flex text-sm transition border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300">
                          <img
                            className="object-cover w-8 h-8 rounded-full"
                            src={user.profile_photo_url}
                            alt={user.name}
                          />
                        </button>
                      ) : (
                        <span className="inline-flex rounded-md">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                          >
                            {user.name}

                            <svg
                              className="ml-2 -mr-0.5 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      )
                    }
                  >
                    {/* <!-- Account Management --> */}
                    <div className="block px-4 py-2 text-xs text-gray-400">Manage Account</div>
                    {/* @ts-ignore */}
                    <DropdownLink href={route('profile.show')}> Profile </DropdownLink>
                    {jetstream.hasApiFeatures && (
                      // @ts-ignore
                      <DropdownLink href={route('api-tokens.index')}>API Tokens</DropdownLink>
                    )}

                    <div className="border-t border-gray-100"></div>

                    {/* <!-- Authentication --> */}
                    <form onSubmit={(e) => usePreventDefault(e, logout)}>
                      <DropdownLink as="button"> Log Out </DropdownLink>
                    </form>
                  </Dropdown>
                </div>
              </div>

              {/* <!-- Hamburger --> */}
              <div className="flex items-center -mr-2 sm:hidden">
                <button
                  onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                  className="inline-flex items-center justify-center p-2 text-gray-400 transition rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                >
                  <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      className={showingNavigationDropdown ? 'hidden' : 'inline-flex'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                      className={showingNavigationDropdown ? 'block' : 'hidden'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* <!-- Responsive Navigation Menu --> */}
            <div className={['sm:hidden', showingNavigationDropdown ? 'block' : 'hidden'].join(' ')}>
              <div className="pt-2 pb-3 space-y-1">
                {/* @ts-ignore */}
                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                  Dashboard
                </ResponsiveNavLink>
              </div>

              {/* <!-- Responsive Settings Options --> */}
              <div className="pt-4 pb-1 border-t border-gray-200">
                <div className="flex items-center px-4">
                  {jetstream.managesProfilePhotos && (
                    <div className="flex-shrink-0 mr-3">
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={user.profile_photo_url}
                        alt={user.name}
                      />
                    </div>
                  )}

                  <div>
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  {/* @ts-ignore */}
                  <ResponsiveNavLink href={route('profile.show')} active={route().current('profile.show')}>
                    Profile
                  </ResponsiveNavLink>
                  {jetstream.hasApiFeatures && (
                    // @ts-ignore
                    <ResponsiveNavLink href={route('api-tokens.index')} active={route().current('api-tokens.index')}>
                      API Tokens
                    </ResponsiveNavLink>
                  )}

                  {/* <!-- Authentication --> */}
                  <form method="POST" onSubmit={(e) => usePreventDefault(e, logout)}>
                    <ResponsiveNavLink as="button"> Log Out </ResponsiveNavLink>
                  </form>

                  {/* <!-- Team Management --> */}
                  {jetstream.hasTeamFeatures && (
                    <>
                      <div className="border-t border-gray-200"></div>

                      <div className="block px-4 py-2 text-xs text-gray-400">Manage Team</div>

                      {/* <!-- Team Settings --> */}
                      <ResponsiveNavLink
                        // @ts-ignore
                        href={route('teams.show', user.current_team)}
                        // @ts-ignore
                        active={route().current('teams.show')}
                      >
                        Team Settings
                      </ResponsiveNavLink>
                      {/* @ts-ignore */}
                      <ResponsiveNavLink href={route('teams.create')} active={route().current('teams.create')}>
                        Create New Team
                      </ResponsiveNavLink>

                      <div className="border-t border-gray-200"></div>

                      {/* <!-- Team Switcher --> */}
                      <div className="block px-4 py-2 text-xs text-gray-400">Switch Teams</div>
                      {allTeams &&
                        allTeams.map((team: Team) => {
                          <form
                            onSubmit={(e) => {
                              'switchToTeam(team)';
                            }}
                            key={team.id}
                          >
                            <ResponsiveNavLink as="button">
                              <div className="flex items-center">
                                {currentTeam === team.id && (
                                  <svg
                                    className="w-5 h-5 mr-2 text-green-400"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                  </svg>
                                )}
                                <div>{team.name}</div>
                              </div>
                            </ResponsiveNavLink>
                          </form>;
                        })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* <!-- Page Heading --> */}
        {header && (
          <header className="bg-white shadow">
            <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">{header}</div>
          </header>
        )}

        {/* <!-- Page Content --> */}
        <main>{children}</main>
      </div>
    </div>
  );
};
export default AppLayout;
