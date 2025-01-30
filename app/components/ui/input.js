import PropTypes from 'prop-types';
import * as React from "react";

import { cn } from "../../lib/utils";


const Input = React.forwardRef((props, ref) => {
  const { className, type, ...rest } = props;

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm  placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...rest}
    />
  );
});
Input.propTypes = { 
    className: PropTypes.string,
    type: PropTypes.string,
    
  };

Input.displayName = "Input";

export { Input };