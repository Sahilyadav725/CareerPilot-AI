function EducationForm({

  education,

  setEducation

}) {

  const handleChange = (index, field, value) => {

    const updated = [...education];

    updated[index][field] = value;

    setEducation(updated);

  };

  const addEducation = () => {

    setEducation([

      ...education,

      {

        degree: "",

        college: "",

        year: "",

        cgpa: ""

      }

    ]);

  };

  const removeEducation = (index) => {

    if (education.length === 1) return;

    const updated = education.filter((_, i) => i !== index);

    setEducation(updated);

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold text-blue-700">

          🎓 Education

        </h2>

        <button

          onClick={addEducation}

          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

        >

          + Add

        </button>

      </div>

      {education.map((edu, index) => (

        <div

          key={index}

          className="border rounded-xl p-5 mt-6"

        >

          <div className="flex justify-between items-center mb-4">

            <h3 className="font-semibold">

              Education {index + 1}

            </h3>

            {education.length > 1 && (

              <button

                onClick={() => removeEducation(index)}

                className="text-red-600 font-semibold"

              >

                Remove

              </button>

            )}

          </div>

          <div className="space-y-4">

            <input

              type="text"

              placeholder="Degree"

              value={edu.degree}

              onChange={(e) =>

                handleChange(

                  index,

                  "degree",

                  e.target.value

                )

              }

              className="w-full border rounded-lg p-3"

            />

            <input

              type="text"

              placeholder="College / University"

              value={edu.college}

              onChange={(e) =>

                handleChange(

                  index,

                  "college",

                  e.target.value

                )

              }

              className="w-full border rounded-lg p-3"

            />

            <div className="grid grid-cols-2 gap-4">

              <input

                type="text"

                placeholder="Passing Year"

                value={edu.year}

                onChange={(e) =>

                  handleChange(

                    index,

                    "year",

                    e.target.value

                  )

                }

                className="border rounded-lg p-3"

              />

              <input

                type="text"

                placeholder="CGPA / Percentage"

                value={edu.cgpa}

                onChange={(e) =>

                  handleChange(

                    index,

                    "cgpa",

                    e.target.value

                  )

                }

                className="border rounded-lg p-3"

              />

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}

export default EducationForm;