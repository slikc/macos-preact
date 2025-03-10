import { mdiApple } from '@mdi/js';
import clsx from 'clsx';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useTimeout } from '__/hooks';
import { AppIcon } from '../utils/AppIcon';
import css from './StartupChime.module.scss';

export const StartupChime = () => {
  const [hiddenSplashScreen, setHiddenSplashScreen] = useState(false);

  useTimeout(() => {
    setHiddenSplashScreen(true);
  }, 3000);

  return (
    <div>
      <div
        class={clsx({
          [css.splashScreen]: true,
          [css.hidden]: hiddenSplashScreen || import.meta.env.DEV,
        })}
        hidden={hiddenSplashScreen}
      >
        <AppIcon path={mdiApple} fill="white" size={100} />
      </div>
      <audio hidden autoPlay={import.meta.env.PROD} src="/" />
    </div>
  );
};
