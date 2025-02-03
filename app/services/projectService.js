const { default: api } = require("./api");

const ProjectService = {
  getProjects: async ({ page =1 , limit = 10,status,name }) => {
      const response = await api.get("/projects", {
        params: {
          page,
          limit,
          status,
          name
        }
      });
      return response.data;
   
  },
};

export default ProjectService;