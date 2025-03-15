"use client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ExcalidrawWrapper from "../../components/ExaclidrawWrapper";
import ProjectService from "@/app/services/projectService";
import AuthService from "@/app/services/authService";
import { toast } from "react-toastify";
import { DialogWrapper } from "@/app/components/ui/dialog-wrapper";
import { Button } from "@/app/components/ui/button";
import CreateDialogComponent from "@/app/components/CreateDialog";
import { connectSocket, disconnectSocket, SOCKET_EVENTS } from "@/app/services/socket";

// Example fallback initial data (if project content is not available)
const fallbackInitialData = {
  elements: [
    {
      id: "6sVDp9mCGQTomD9Cg5w1b",
      type: "rectangle",
      x: 202.04296875,
      y: -672.6953125,
      width: 163,
      height: 185,
      angle: 0,
      strokeColor: "#000000",
      backgroundColor: "#e64980",
      fillStyle: "solid",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      groupIds: [],
      strokeSharpness: "sharp",
      seed: 1640006454,
      version: 74,
      versionNonce: 1054194038,
      isDeleted: false,
      boundElements: [
        { type: "text", id: "MB9CSH621UIKH8MEgOhaM" },
      ],
      updated: 1639729535736,
      customData: {
        id: "rect-1",
        version: "1",
      },
    },
  ],
  appState: {
    currentItemFontFamily: 1,
  },
  scrollToContent: true,
};

export default function ProjectPage({ params }) {
  
  const resolvedParams = use(params);
  const { projectId } = resolvedParams;

  const router = useRouter();

  const [projectContent, setProjectContent] = useState(null);
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [profile, setProfile] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [error, setError] = useState(null);
  const [collaborators, setCollaborators] = useState(null);

  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const socket = useRef(null);
  const owner = useRef(null);
  const access = useRef(null);
  const isUpdatedByMe = useRef(null);
  async function fetchData() {
    try {
      const cachedProfile = AuthService.getUserProfile();
      let fetchedProfile = cachedProfile;
      if (!cachedProfile) {
        fetchedProfile = await AuthService.getProfile();
      }
      setProfile(fetchedProfile);

      const response = await ProjectService.getProject(projectId);
      const data = response.data;
      owner.current = data.owner;
      access.current = data.access;
      setProjectContent(data.content);
      setName(data.name);
      setUpdatedName(data.name);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error?.response?.status === 401 && error.response?.data?.redirect) {
        router.replace("/auth/login");
      }
    }
  }
  useEffect(() => {
   
    if (projectId) {
      fetchData();
    }
  }, [projectId, router]);

  useEffect(() => {
    if (!socket.current && projectId && profile) {
        socket.current = connectSocket( profile.id, projectId);

        socket.current.on(SOCKET_EVENTS.ACTIVE_USERS,(data) => {
          const dataWithoutSelf = data.filter((user) => user.id !== profile.id) || [];
           setCollaborators(dataWithoutSelf);
        });

        socket.current.on(SOCKET_EVENTS.UPDATE_PROJECT,() => {
          
            if(!isUpdatedByMe.current) {
                fetchData();
                isUpdatedByMe.current = false;
            } else {
                isUpdatedByMe.current = false;
            }
        });
        socket.current.on(SOCKET_EVENTS.DELETE_PROJECT,() => {
           toast.error('Project deleted by owner');
           router.replace('/dashboard');
        })
        socket.current.on(SOCKET_EVENTS.KICKED_OUT,() => {
            toast.error('Project access revoked by owner');
            router.replace('/dashboard');
        });
    }
    return () => {
        disconnectSocket();
        socket.current = null;
    }
  }, [projectId, router, profile,projectContent]);
    const handleChange = (data) => {
    isUpdatedByMe.current = true;
    try {
      ProjectService.updateProject({
          id: projectId,
          content: {
              elements: data.elements,
              scrollToContent: data.scrollToContent ,
              appState: data.appState 
              
          }
      });
    } catch (_) {
      toast.error("Error updating project");
      isUpdatedByMe.current = false;
    }
  };
  const renameProject = async () => {
    setDisableButton(true);
    isUpdatedByMe.current = true;
    try {
      await ProjectService.updateProject({ id: projectId, name: updatedName });
      setIsNameDialogOpen(false);
      setName(updatedName);
      toast.success("Project updated successfully");

      setError(null);
    } catch (error) {
      console.error("Error updating project:", error);
      setError(error.response?.data?.message || "Error updating project");
    } finally {
      setDisableButton(false);
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value.trim();
    setUpdatedName(e.target.value);
    if (newName.length === 0) {
      setError("Project name cannot be empty");
      setDisableButton(true);
    } else {
      setError(null);
      setDisableButton(false);
    }
  };

  const deleteProject = async () => {
    try {
      await ProjectService.deleteProject(projectId);
      toast.success("Project deleted successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Error deleting project");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  if (!projectContent) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center justify-start flex-wrap gap-4 md:gap-8">
            <Link href="/dashboard">
              <MoveLeft />
            </Link>
            <h1 className="flex-1">
              <span className="text-lg md:text-xl font-bold leading-6 text-gray-900">
                {name}
              </span>
            </h1> {
                owner.current === profile?.id ? <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsNameDialogOpen(true)}
                  className="flex items-center bg-white text-primary text-base border border-primary rounded py-1 px-2 hover:bg-pink-200 hover:shadow-md transition"
                >
                  Rename
                </button>
                <button
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="flex items-center bg-red-500 text-white text-base rounded py-1 px-2 border border-red-600 hover:bg-red-600 hover:shadow-md transition"
                >
                  Delete
                </button>
              </div> : ''
            }
          </div>
        </div>
      </header>
      
      <ExcalidrawWrapper
        initialData={projectContent}
        collaborators={collaborators}
        projectId={projectId}
        owner={ owner.current === profile?.id }
        access={access.current}
        onChange={handleChange}

      />
      <DialogWrapper
        isOpen={isNameDialogOpen}
        onOpenChange={setIsNameDialogOpen}
        title="Rename project"
        description="Please enter new name for project"
        content={
          <CreateDialogComponent
            onChange={handleNameChange}
            error={error}
            value={updatedName}
          />
        }
        footer={
          <Button
            className="text-white hover:bg-pink-600 hover:shadow-md"
            disabled={disableButton}
            onClick={renameProject}
          >
            Update
          </Button>
        }
      />
      <DialogWrapper
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Confirm deletion"
        description="Deleting this project is irreversible. Are you sure you want to delete this project?"
        footer={
          <Button variant="destructive" onClick={deleteProject}>
            Delete
          </Button>
        }
      />
    </div>
  );
}
