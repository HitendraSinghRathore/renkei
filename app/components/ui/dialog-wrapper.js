import React from "react";
import {
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"; 

export const DialogWrapper = ({
  triggerButton,
  title,
  description,
  content,
  footer,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-w-[680px] mx-auto"> 
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl">{title}</DialogTitle>
          {description && <DialogDescription className="text-base text-gray-500 ">{description}</DialogDescription>}
        </DialogHeader>
        {content}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};