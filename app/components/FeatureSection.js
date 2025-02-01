import { Waypoints,Cuboid,Zap, LayoutDashboard} from 'lucide-react';
export default function FeatureSection() {
  return (
    <section className="w-full mx-auto px-4 sm:px-8 mb-20 md:mb-40 flex flex-col items-center gap-10 sm:gap-20">
      <h3 className="bg-white-200 border border-gray-100 text-dark-primary text-md lg:text-md py-1 px-2 rounded-full shadow whitespace-nowrap">
        Features
      </h3>
      <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        All the things that you need
        <br />
        <span className="text-gray-400">In one place</span>
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-15 w-full">
        <div className="card">
          <span className="icon">
            <Cuboid />
          </span>
          <h4>Extensive</h4>
          <p >
           Use anything from text to shapes to draft your ideas in the project. Reuse styles and components anywhere. 
          </p>
          <div className="shine"></div>
          <div className="background">
            <div className="tiles">
              <div className="tile tile-1"></div>
              <div className="tile tile-2"></div>
              <div className="tile tile-3"></div>
              <div className="tile tile-4"></div>

              <div className="tile tile-5"></div>
              <div className="tile tile-6"></div>
              <div className="tile tile-7"></div>
              <div className="tile tile-8"></div>

              <div className="tile tile-9"></div>
              <div className="tile tile-10"></div>
            </div>

            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
        </div>
        <div className="card">
          <span className="icon">
            <LayoutDashboard /> 
          </span>
          <h4>Observable</h4>
          <p>
          View all your work in one place and move between projects from a comprehensive dashboard
          </p>
          <div className="shine"></div>
          <div className="background">
            <div className="tiles">
              <div className="tile tile-1"></div>
              <div className="tile tile-2"></div>
              <div className="tile tile-3"></div>
              <div className="tile tile-4"></div>

              <div className="tile tile-5"></div>
              <div className="tile tile-6"></div>
              <div className="tile tile-7"></div>
              <div className="tile tile-8"></div>

              <div className="tile tile-9"></div>
              <div className="tile tile-10"></div>
            </div>

            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
        </div>
        <div className="card">
          <span className="icon">
            <Zap />
          </span>
          <h4>Efficient</h4>
          <p>
           Using real time updates between projects, your work is always up to date.
          </p>
          <div className="shine"></div>
          <div className="background">
            <div className="tiles">
              <div className="tile tile-1"></div>
              <div className="tile tile-2"></div>
              <div className="tile tile-3"></div>
              <div className="tile tile-4"></div>

              <div className="tile tile-5"></div>
              <div className="tile tile-6"></div>
              <div className="tile tile-7"></div>
              <div className="tile tile-8"></div>

              <div className="tile tile-9"></div>
              <div className="tile tile-10"></div>
            </div>

            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
        </div>
        <div className="card col-start-auto md:col-start-2 lg:col-start-auto" >
          <span className="icon">
            <Waypoints />
          </span>
          <h4>Collaborative</h4>
          <p>
            Share your ideas with your team and collaborate on projects with ease. One button click to share and manage access.
          </p>
          <div className="shine"></div>
          <div className="background">
            <div className="tiles">
              <div className="tile tile-1"></div>
              <div className="tile tile-2"></div>
              <div className="tile tile-3"></div>
              <div className="tile tile-4"></div>

              <div className="tile tile-5"></div>
              <div className="tile tile-6"></div>
              <div className="tile tile-7"></div>
              <div className="tile tile-8"></div>

              <div className="tile tile-9"></div>
              <div className="tile tile-10"></div>
            </div>

            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
