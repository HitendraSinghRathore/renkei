import React from "react";
import { Input } from "./ui/input";

 function CreateDialogComponent({onChange, error, value}) {
    return (
      <div>
        <Input type="text" placeholder="Project name"  className="focus-within:outline-[2px] focus-within:outline-offset-[2px] focus-within:outline--accent" onChange={(e) => onChange(e)} value={value} />
       {error ? <p className="text-red-500 text-xs mt-2">{error}</p> : null}
      </div>
    );
  };

export default React.memo(CreateDialogComponent);