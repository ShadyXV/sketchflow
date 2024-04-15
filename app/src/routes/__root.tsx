import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { useStore } from '@tanstack/react-store';
import { Store } from '@tanstack/store';

export const store = new Store({
  dogs: 0,
  cats: 0,
});

const Display = ({ animal }) => {
  const count = useStore(store, state => state[animal]);
  return <div>{`${animal}: ${count}`}</div>;
};

const updateState = animal => {
  store.setState(state => {
    return {
      ...state,
      [animal]: state[animal] + 1,
    };
  });
};
const Increment = ({ animal }) => (
  <button onClick={() => updateState(animal)}>My Friend Likes {animal}</button>
);

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <h1>How many of your friends like cats or dogs?</h1>
      <p>Press one of the buttons to add a counter of how many of your friends like cats or dogs</p>
      <Increment animal="dogs" />
      <Display animal="dogs" />
      <Increment animal="cats" />
      <Display animal="cats" />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
