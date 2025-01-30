import PropTypes from 'prop-types';
import * as React from "react";

import { cn } from "@/app/lib/utils";

const Label = React.forwardRef(({ className,htmlFor, ...props }, ref) => {
  return (
    <label
    htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium text-primary-dark leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Label.displayName = "Label";

Label.propTypes = {
    className: PropTypes.string,
    props: PropTypes.object,
    htmlFor: PropTypes.string,
}
export { Label };