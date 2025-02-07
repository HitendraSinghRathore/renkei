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
      return {
        "items": [{
          id: 1,
          name: "12313132313",
          access: "write",
          owner: {
            id: 123,
            name: "Test user"
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }],
        "pageItems": {
            "page": 1,
            "limit": 10,
            "total": 85,
            "totalPages": 9,
            "hasNext": true,
            "hasPrev": false
        }
    };
   
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
  }
};

export default ProjectService;