import { useState } from "react";

function SkillsForm({

  skills,

  setSkills

}) {

  const [skill, setSkill] = useState("");

  const addSkill = () => {

    const value = skill.trim();

    if (!value) return;

    if (skills.includes(value)) {

      setSkill("");

      return;

    }

    setSkills([

      ...skills,

      value

    ]);

    setSkill("");

  };

  const removeSkill = (index) => {

    const updated = skills.filter((_, i) => i !== index);

    setSkills(updated);

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      e.preventDefault();

      addSkill();

    }

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold text-blue-700">

        🛠 Skills

      </h2>

      <p className="text-gray-500 mt-2">

        Press Enter or click Add to add skills.

      </p>

      <div className="flex gap-3 mt-6">

        <input

          type="text"

          value={skill}

          onChange={(e)=>setSkill(e.target.value)}

          onKeyDown={handleKeyDown}

          placeholder="Example: Splunk"

          className="flex-1 border rounded-lg p-3"

        />

        <button

          onClick={addSkill}

          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"

        >

          Add

        </button>

      </div>

      <div className="flex flex-wrap gap-3 mt-6">

        {skills.map((item,index)=>(

          <div

            key={index}

            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center gap-2"

          >

            <span>

              {item}

            </span>

            <button

              onClick={()=>removeSkill(index)}

              className="text-red-600 font-bold hover:text-red-800"

            >

              ×

            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default SkillsForm;