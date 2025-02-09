import api from './api';

const ProjectService = {
  getProjects: async ({ status,name, page =1 , limit = 10 }) => {
    const params = {
      page,
      limit
    };
    if(status) { params.status = status};
    if(name) { params.name = name};
      const response = await api.get("/project", {
        params
      });
      return response.data;
   
  },
  updateProject: async ({id, name, content}) => {
    const payload = {
      id
    };
    if (content) { payload.content = content; }
    if (name) { payload.name = name; }
    const response = await api.put(`/project/${id}`, payload);
    return response.data;
  },
  deleteProject: async (id) => {
    const response = await api.delete(`/project/${id}`);
    return response.data;
  },
  createProject: async (name) => {
    const response = await api.post("/project/create", {
      name,
      content: {
        elements: [],
        scrollToContent: true,
        appState: {
          currentItemFontFamily: 1,
        }
      }
    });
    return response.data;
  },
  getProject: async(id) => {
    const response = await api.get(`/project/${id}`);
    return response.data;
  } ,
  getMembers: async(id) => {
    const response = await api.get(`/project/${id}/members`);
    return response.data;
  },
  shareMember: async (projectId,data) => {
    const response = await api.post(`/project/${projectId}/share`, data);
    return response.data;
  }
};

export default ProjectService;