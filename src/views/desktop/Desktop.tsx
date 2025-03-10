import { useEffect, useRef } from 'preact/hooks';
import { ContextMenu } from '__/components/Desktop/ContextMenu/ContextMenu';
import { WindowsArea } from '__/components/Desktop/Window/WindowsArea';
import { Dock } from '__/components/dock/Dock';
import { TopBar } from '__/components/topbar/TopBar';
import css from './Desktop.module.scss';

const DarkBackground = '/assets/wallpapers/3-1.jpg';
const LightBackground = '/assets/wallpapers/3-2.jpg';

export const Desktop = () => {
  const outerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    preloadImage(DarkBackground);
    preloadImage(LightBackground);
  }, []);

  return (
    <div>
      <main ref={outerRef} class={css.main}>
        <ContextMenu outerRef={outerRef} />
        <TopBar />
        <WindowsArea />
        <Dock />
      </main>

      <div class={css.backgroundCover} aria-hidden="true" />
    </div>
  );
};

function preloadImage(path: string) {
  const img = new Image();
  img.src = path;
}
