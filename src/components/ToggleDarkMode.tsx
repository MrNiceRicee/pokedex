import ctl from '@netlify/classnames-template-literals';
import * as Switch from '@radix-ui/react-switch';
import useDarkMode from '../hooks/useDarkMode';

const DarkModeButton = () => {
  const [mode, setMode] = useDarkMode();

  return (
    <Switch.Root
      className={ctl(`
        w-12 h-6 rounded-full relative bg-gray-300 dark:bg-gray-500
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500
        transition-all duration-300
        data-state-checked:bg-gray-700
        group
      `)}
      onCheckedChange={setMode}
      checked={mode}
    >
      <Switch.Thumb
        className="
            block
            w-4 h-4
            bg-white
            rounded-lg
            shadow
            translate-x-1
            transition-transform
            duration-150
            group-active:scale-x-110
            data-state-checked:translate-x-7
            group-active:data-state-checked:translate-x-7
            group-active:data-state-unchecked:translate-x-[0.275rem]
            relative
            before
            before:absolute
            before:inset-0
            before:w-2
            before:h-2
            before:translate-y-[50%]
            before:translate-x-[50%]
            before:bg-blue-300
            before:rounded-lg
            before:shadow-inner
            before:scale-0
            before:transition-transform
            before:duration-150
            before:group-focus:scale-100
          "
      />
    </Switch.Root>
  );
};

export default DarkModeButton;
