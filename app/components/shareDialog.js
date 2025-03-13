"use client";

import { useEffect, useState, useCallback } from "react";
import ProjectService from "../services/projectService";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { X, PlusIcon } from "lucide-react";
import { Separator } from "./ui/separator";


const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ShareDialogComponent({ projectId, setUsers }) {
  const [readMembers, setReadMembers] = useState([]);
  const [writeMembers, setWriteMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState(null);
  const [currentAccess, setCurrentAccess] = useState("read");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await ProjectService.getMembers(projectId);
        setAvailableMembers(data);
        const read = data.filter((member) => member.access === "read");
        const write = data.filter((member) => member.access === "write");
        setReadMembers(read);
        setWriteMembers(write);
        setUsers([...read, ...write]);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };

    if (projectId) {
      fetchMembers();
    }
  }, [projectId, setUsers]);

  const getError = useCallback(
    (email) => {
      if (!emailRegex.test(email.toLowerCase())) {
        return "Invalid email address";
      }
      const member = availableMembers.find((m) => m.email === email);
      if (!member) {
        return "User not found, please enter a valid email";
      }
      return null;
    },
    [availableMembers]
  );

  // Add a member based on the current access level.
  const handleAddMember = useCallback(() => {
    const validationError = getError(emailInput);
    setError(validationError);
    if (validationError) return;

    const member = availableMembers.find((m) => m.email === emailInput);
    if (!member) return; // Safety check

    if (currentAccess === "read") {
      const newReadMembers = [...readMembers, { ...member, access: "read" }];
      setReadMembers(newReadMembers);
      setUsers([...newReadMembers, ...writeMembers]);
    } else {
      const newWriteMembers = [...writeMembers, { ...member, access: "write" }];
      setWriteMembers(newWriteMembers);
      setUsers([...readMembers, ...newWriteMembers]);
    }
    setEmailInput("");
  }, [availableMembers, emailInput, currentAccess, readMembers, writeMembers, getError, setUsers]);

  // Remove a member based on the access level.
  const removeMember = useCallback(
    (id, access) => {
      if (access === "read") {
        const updated = readMembers.filter((m) => m.id !== id);
        setReadMembers(updated);
        setUsers([...updated, ...writeMembers]);
      } else {
        const updated = writeMembers.filter((m) => m.id !== id);
        setWriteMembers(updated);
        setUsers([...readMembers, ...updated]);
      }
    },
    [readMembers, writeMembers, setUsers]
  );

  return (
    <div>
      <div className="flex gap-0 mb-2">
        <Input
          placeholder="Enter user email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <Select value={currentAccess} onValueChange={setCurrentAccess}>
          <SelectTrigger className="w-[180px] border border-gray-300 rounded active:ring-pink-500 focus:ring-pink-500 focus:border-pink-500">
            <SelectValue placeholder="Select access level" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="write">Write</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
      <button
        className="bg-white flex gap-2 items-center text-primary rounded-md py-1 px-2 hover:bg-pink-100 hover:shadow-md transition border border-pink-500"
        onClick={handleAddMember}
      >
        <PlusIcon color="#f0117a" className="w-4 h-4" />
        Add
      </button>
      {(readMembers.length > 0 || writeMembers.length > 0) && (
        <Separator className="mt-4 bg-gray-300 mb-4" />
      )}
      {readMembers.length > 0 && (
        <div className="flex flex-col gap-2 mb-4">
          <h3 className="text-lg">Read Users</h3>
          <div className="flex gap-2 flex-wrap">
            {readMembers.map((member) => (
              <button
                key={member.id}
                className="flex gap-2 items-center bg-gray-900 text-white cursor-pointer rounded-md p-2"
                onClick={() => removeMember(member.id, "read")}
              >
                <span className="flex-1">{member.email}</span>
                <span type="button">
                  <X color="white" className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      {writeMembers.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-lg">Write Users</h3>
          <div className="flex gap-2 flex-wrap">
            {writeMembers.map((member) => (
              <button
                key={member.id}
                className="flex gap-2 items-center bg-gray-900 text-white cursor-pointer rounded-md p-2"
                onClick={() => removeMember(member.id, "write")}
              >
                <span className="flex-1">{member.email}</span>
                <span type="button">
                  <X color="white" className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
