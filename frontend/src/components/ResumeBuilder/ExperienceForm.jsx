import { useState } from "react";

function ExperienceForm({

  experience,

  setExperience

}) {

  const handleChange = (index, field, value) => {

    const updated = [...experience];

    updated[index][field] = value;

    setExperience(updated);

  };

  const handleCurrentJob = (index) => {

    const updated = [...experience];

    updated[index].current = !updated[index].current;

    if (updated[index].current) {
      updated[index].endDate = "";
    }

    setExperience(updated);

  };

  const addExperience = () => {

    setExperience([

      ...experience,

      {

        company: "",

        role: "",

        startDate: "",

        endDate: "",

        current: false,

        description: ""

      }

    ]);

  };

  const removeExperience = (index) => {

    if (experience.length === 1) return;

    const updated = experience.filter((_, i) => i !== index);

    setExperience(updated);

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold text-blue-700">

          💼 Experience

        </h2>

        <button

          onClick={addExperience}

          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

        >

          + Add

        </button>

      </div>

      {experience.map((exp, index) => (

        <div

          key={index}

          className="border rounded-xl p-5 mt-6"

        >

          <div className="flex justify-between items-center mb-4">

            <h3 className="font-semibold">

              Experience {index + 1}

            </h3>

            {experience.length > 1 && (

              <button

                onClick={() => removeExperience(index)}

                className="text-red-600 font-semibold"

              >

                Remove

              </button>

            )}

          </div>

          <div className="space-y-4">

            <input

              type="text"

              placeholder="Company Name"

              value={exp.company}

              onChange={(e)=>

                handleChange(index,"company",e.target.value)

              }

              className="w-full border rounded-lg p-3"

            />

            <input

              type="text"

              placeholder="Job Role"

              value={exp.role}

              onChange={(e)=>

                handleChange(index,"role",e.target.value)

              }

              className="w-full border rounded-lg p-3"

            />

            <div className="grid grid-cols-2 gap-4">

                <label className="text-sm text-gray-500">

                Start Date

                </label>

              <input

                type="month"

                value={exp.startDate}

                onChange={(e)=>

                  handleChange(index,"startDate",e.target.value)

                }

                className="w-full border rounded-lg p-3"
                placeholder="Start Date"

              />

              <label className="text-sm text-gray-500">

                End Date

                </label>

              <input

                type="month"

                value={exp.endDate}

                disabled={exp.current}

                onChange={(e)=>

                  handleChange(index,"endDate",e.target.value)

                }

                className="w-full border rounded-lg p-3"
                placeholder="End Date"

              />

            </div>

            <label className="flex items-center gap-2">

              <input

                type="checkbox"

                checked={exp.current}

                onChange={()=>handleCurrentJob(index)}

              />

              Currently Working Here

            </label>

            <textarea

              rows="4"

              placeholder="Describe your work..."

              value={exp.description}

              onChange={(e)=>

                handleChange(index,"description",e.target.value)

              }

              className="w-full border rounded-lg p-3"

            />

          </div>

        </div>

      ))}

    </div>

  );

}

export default ExperienceForm;