import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui';
import { useTheme } from 'next-themes';

enum Theme {
  System = 'system',
  Dark = 'dark',
  Light = 'light',
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const onThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <Select defaultValue={theme} onValueChange={onThemeChange}>
      <SelectTrigger className='h-6 w-24'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={Theme.System}>System</SelectItem>
          <SelectItem value={Theme.Light}>Light</SelectItem>
          <SelectItem value={Theme.Dark}>Dark</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
