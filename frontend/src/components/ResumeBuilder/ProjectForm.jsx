function ProjectForm({

  projects,

  setProjects

}) {

  const handleChange = (index, field, value) => {

    const updated = [...projects];

    updated[index][field] = value;

    setProjects(updated);

  };

  const addProject = () => {

    setProjects([

      ...projects,

      {

        title: "",

        techStack: "",

        github: "",

        liveDemo: "",

        description: ""

      }

    ]);

  };

  const removeProject = (index) => {

    if (projects.length === 1) return;

    const updated = projects.filter((_, i) => i !== index);

    setProjects(updated);

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold text-blue-700">

          🚀 Projects

        </h2>

        <button

          onClick={addProject}

          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

        >

          + Add

        </button>

      </div>

      {projects.map((project, index) => (

        <div

          key={index}

          className="border rounded-xl p-5 mt-6"

        >

          <div className="flex justify-between items-center mb-4">

            <h3 className="font-semibold">

              Project {index + 1}

            </h3>

            {projects.length > 1 && (

              <button

                onClick={() => removeProject(index)}

                className="text-red-600 font-semibold"

              >

                Remove

              </button>

            )}

          </div>

          <div className="space-y-4">

            <input

              type="text"

              placeholder="Project Title"

              value={project.title}

              onChange={(e)=>

                handleChange(

                  index,

                  "title",

                  e.target.value

                )

              }

              className="w-full border rounded-lg p-3"

            />

            <input

              type="text"

              placeholder="Tech Stack (React, Python, Splunk...)"

              value={project.techStack}

              onChange={(e)=>

                handleChange(

                  index,

                  "techStack",

                  e.target.value

                )

              }

              className="w-full border rounded-lg p-3"

            />

            <input

              type="text"

              placeholder="GitHub Repository"

              value={project.github}

              onChange={(e)=>

                handleChange(

                  index,

                  "github",

                  e.target.value

                )

              }

              className="w-full border rounded-lg p-3"

            />

            <input

              type="text"

              placeholder="Live Demo URL (Optional)"

              value={project.liveDemo}

              onChange={(e)=>

                handleChange(

                  index,

                  "liveDemo",

                  e.target.value

                )

              }

              className="w-full border rounded-lg p-3"

            />

            <textarea

              rows="5"

              placeholder="Describe your project..."

              value={project.description}

              onChange={(e)=>

                handleChange(

                  index,

                  "description",

                  e.target.value

                )

              }

              className="w-full border rounded-lg p-3"

            />

          </div>

        </div>

      ))}

    </div>

  );

}

export default ProjectForm;