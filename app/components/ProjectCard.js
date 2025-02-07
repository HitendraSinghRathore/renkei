import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Badge } from "./ui/badge";
import {  EllipsisVertical, Pen, TextCursorInput, Trash2Icon } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React from "react";
import { useRouter } from "next/navigation";

function ProjectCard({ id, name, updatedAt, owner, access, onUpdate, onDelete }) {
  const router = useRouter();
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl cursor-pointer shadow-sm transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 p-2 md:p-4"
      role="button"
      tabIndex={0}
      aria-label={`Project card for ${name}. ${
        owner ? "Owned by " + owner + ". " : ""
      }Updated ${updatedAt}.`}
    >
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 pr-4 wrap-ellipsis overflow-hidden">
          {name}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex items-center gap-2 rounded-full text-xs sm:text-sm hover:bg-pink-200 cursor-pointer"  type="button"
                aria-label="Open project options">
             
                <EllipsisVertical className="absolute right-2 top-4" aria-hidden="true" />

            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
            <DropdownMenuItem  onSelect={() => requestAnimationFrame(() => {
               router.push(`/project/${id}`);
              })}>
                <Pen/>
              Edit
            </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => {
                e.preventDefault();
              requestAnimationFrame(() => {
                onUpdate({ id, name });
              });
            }}>
              
                  <TextCursorInput aria-hidden="true" />
                  <span>Rename</span>
                
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onSelect={(e) =>{e.preventDefault(); requestAnimationFrame(() => {onDelete({id})} ) }}>
               
                  <Trash2Icon aria-hidden="true" />
                  <span>Delete</span>
               
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </h2>
        {owner && (
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Owned by <span className="font-medium">{owner}</span>
          </p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="text-xs text-gray-500">
          <span>Updated </span>
          <span className="font-medium text-sm text-gray-800">{new Date(updatedAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric'})}</span>
        </div>
        <Badge variant="primary" className="mt-2 sm:mt-0">
          {access}
        </Badge>
      </div>
    </div>
  );
}

export default React.memo(ProjectCard);
