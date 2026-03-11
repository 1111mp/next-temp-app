'use client';

import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui';

const PasswordInput = ({ ...props }: React.ComponentProps<'input'>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const title = showPassword ? 'Hide password' : 'Show password';

  return (
    <InputGroup>
      <InputGroupInput {...props} type={showPassword ? 'text' : 'password'} />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton
          size='icon-xs'
          title={title}
          aria-label={title}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export { PasswordInput };
