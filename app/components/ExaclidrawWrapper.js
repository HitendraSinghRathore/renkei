'use client';

import { Excalidraw, getSceneVersion } from '@excalidraw/excalidraw';
import { useEffect, useRef, useState, useCallback } from 'react';
import '../../node_modules/@excalidraw/excalidraw/dist/prod/index.css';
import '@/public/styles/excalidraw.css';
import { Button } from './ui/button';
import { Users } from 'lucide-react';
import { debounce } from 'lodash';
import ShareDialogComponent from './shareDialog';
import { DialogWrapper } from './ui/dialog-wrapper';
import ProjectService from '../services/projectService';
import { toast } from 'react-toastify';

function ExcalidrawWrapper({
  initialData,
  collaborators,
  owner,
  projectId,
  access,
  onChange,
}) {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const lastSceneVersionRef = useRef(null);

  const renderTopRightUI = useCallback(() => {
    if (!owner) return null;
    return (
      <div className="relative">
        <Button onClick={() => setIsDialogOpen(true)} className="text-white">
          <Users color="white" /> Share
        </Button>
        {isCollaborating && collaborators?.length > 0 && (
          <span className="inline-block absolute w-8 h8 rounded-full bottom-0 left-0 bg-gray-900 -translate-x-1/2 translate-y-1/2 flex items-center justify-center text-white">
            {collaborators.length}
          </span>
        )}
      </div>
    );
  }, [owner, isCollaborating, collaborators]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.EXCALIDRAW_ASSET_PATH = '/';
    }
  }, []);

  useEffect(() => {
    if (excalidrawAPI) {
      excalidrawAPI.updateScene(initialData);
    }
  }, [initialData, excalidrawAPI]);

  useEffect(() => {
    if (excalidrawAPI && owner) {
      setIsCollaborating(!!(collaborators && collaborators.length > 0));
    }
  }, [collaborators, excalidrawAPI, owner]);

  const shareProject = useCallback(() => {
    ProjectService.shareMember(projectId, { users })
      .then(() => {
        setUsers([]);
        toast.success('Project shared successfully');
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ?? 'Error sharing project'
        );
      })
      .finally(() => {
        setIsDialogOpen(false);
      });
  }, [projectId, users]);

  const debouncedOnChange = useRef(
    debounce((elements, appState) => {
      const version = getSceneVersion(elements);
      if (version !== lastSceneVersionRef.current) {
        lastSceneVersionRef.current = version;
        if (onChange) {
          onChange({
            elements,
            scrollToContent: true,
            appState,
          });
        }
      }
    }, 1500)
  ).current;


  const handleExcalidrawChange = useCallback(
    (data) => {
      if (excalidrawAPI) {
        const appState = excalidrawAPI.getAppState();
        debouncedOnChange(data, appState);
      }
    },
    [excalidrawAPI, debouncedOnChange]
  );

  return (
    <div
      style={{
        width: '100vw',
        height: '90vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <Excalidraw
        theme="light"
        onChange={handleExcalidrawChange}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        initialData={initialData}
        viewModeEnabled={access !== 'write'}
        renderTopRightUI={renderTopRightUI}
        UIOptions={{
          tools: {
            image: false,
          },
        }}
      />
      <DialogWrapper
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Share project"
        description="Select users to share project with"
        content={<ShareDialogComponent projectId={projectId} setUsers={setUsers} />}
        footer={
          <Button
            className="text-white hover:bg-pink-600 hover:shadow-md"
            onClick={shareProject}
          >
            Share
          </Button>
        }
      />
    </div>
  );
}

export default ExcalidrawWrapper;
