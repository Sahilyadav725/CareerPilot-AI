import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { uploadResume } from "../../api/resumeApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Resume() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [dragActive, setDragActive] = useState(false);

  const [resumeData, setResumeData] = useState(null);

  const MAX_SIZE = 5 * 1024 * 1024;

  const validateFile = (selectedFile) => {

    if (!selectedFile) return false;

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(selectedFile.type)) {

      toast.error("Only PDF, DOC and DOCX are allowed.");

      return false;

    }

    if (selectedFile.size > MAX_SIZE) {

      toast.error("Maximum file size is 5 MB.");

      return false;

    }

    return true;

  };

  const handleFileChange = (e) => {

    const selected = e.target.files[0];

    if (validateFile(selected)) {

      setFile(selected);

    }

  };

  const handleDrop = (e) => {

    e.preventDefault();

    setDragActive(false);

    const selected = e.dataTransfer.files[0];

    if (validateFile(selected)) {

      setFile(selected);

    }

  };

  const removeFile = () => {

    setFile(null);

    setResumeData(null);

    setUploadProgress(0);

  };

  const handleUpload = async () => {

    if (!file) {

      toast.error("Please select a resume.");

      return;

    }

    try {

      setLoading(true);

      setUploadProgress(10);

      const interval = setInterval(() => {

        setUploadProgress((prev) => {

          if (prev >= 90) return prev;

          return prev + 10;

        });

      }, 150);

      const data = await uploadResume(file);

      clearInterval(interval);

      setUploadProgress(100);

      setResumeData(data);

      toast.success("Resume analyzed successfully!");

      setTimeout(() => {

        navigate("/jobs");

      }, 1000);

    } catch (error) {

      console.log(error);

      toast.error("Resume upload failed.");

      setUploadProgress(0);

    } finally {

      setLoading(false);

    }

  };

  return (

  <MainLayout>

    <div className="mb-8">

      <h1 className="text-4xl font-bold text-slate-800">
        Resume Manager
      </h1>

      <p className="text-slate-500 mt-2">
        Upload your latest resume for AI-powered ATS analysis.
      </p>

    </div>

    <div className="bg-white rounded-2xl shadow-lg p-8">

      <div

        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}

        onDragLeave={() => setDragActive(false)}

        onDrop={handleDrop}

        className={`border-2 border-dashed rounded-2xl p-10 transition-all duration-300 text-center ${
          dragActive
            ? "border-blue-600 bg-blue-50"
            : "border-gray-300"
        }`}

      >

        <div className="text-6xl mb-5">

          📄

        </div>

        <h2 className="text-2xl font-bold">

          Drag & Drop Resume

        </h2>

        <p className="text-gray-500 mt-3">

          or click below to browse files

        </p>

        <label

          htmlFor="resumeUpload"

          className="inline-block mt-8 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"

        >

          Choose Resume

        </label>

        <input

          id="resumeUpload"

          type="file"

          accept=".pdf,.doc,.docx"

          className="hidden"

          onChange={handleFileChange}

        />

        <p className="text-sm text-gray-400 mt-4">

          Supported: PDF, DOC, DOCX • Max 5 MB

        </p>

      </div>

      {file && (

        <div className="mt-8 border rounded-xl p-5 bg-slate-50">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold">

                {file.name}

              </h3>

              <p className="text-sm text-gray-500">

                {(file.size / 1024 / 1024).toFixed(2)} MB

              </p>

            </div>

            <button

              onClick={removeFile}

              className="text-red-600 hover:text-red-700 font-semibold"

            >

              Remove

            </button>

          </div>

        </div>

      )}

      {loading && (

        <div className="mt-6">

          <div className="flex justify-between text-sm mb-2">

            <span>Uploading...</span>

            <span>{uploadProgress}%</span>

          </div>

          <div className="w-full h-3 rounded-full bg-gray-200">

            <div

              className="h-3 rounded-full bg-blue-600 transition-all duration-300"

              style={{

                width: `${uploadProgress}%`

              }}

            />

          </div>

        </div>

      )}

      <button

        disabled={!file || loading}

        onClick={handleUpload}

        className={`mt-8 w-full py-3 rounded-xl font-semibold transition ${
          file && !loading
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}

      >

        {loading ? "Uploading Resume..." : "Upload Resume"}

      </button>

    </div>

    {resumeData && (

      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

        <h2 className="text-3xl font-bold mb-8">

          Resume Analysis

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <p><strong>Name:</strong> {resumeData.parsed_data.full_name || "--"}</p>

            <p className="mt-2"><strong>Email:</strong> {resumeData.parsed_data.email || "--"}</p>

            <p className="mt-2"><strong>Phone:</strong> {resumeData.parsed_data.phone || "--"}</p>

          </div>

          <div className="flex flex-col items-center justify-center">

            <div className="text-6xl font-bold text-green-600">

              {resumeData.ats_score}%

            </div>

            <p className="text-gray-500 mt-2">

              ATS Score

            </p>

          </div>

        </div>

        <div className="mt-8">

          <h3 className="font-bold text-lg">

            Skills

          </h3>

          <div className="flex flex-wrap gap-2 mt-3">

            {resumeData.parsed_data.skills?.length > 0 ? (

              resumeData.parsed_data.skills.map((skill, index) => (

                <span

                  key={index}

                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"

                >

                  {skill}

                </span>

              ))

            ) : (

              <span>No Skills Found</span>

            )}

          </div>

        </div>

        <div className="mt-8">

          <h3 className="font-bold text-lg">

            AI Suggestions

          </h3>

          <ul className="list-disc ml-6 mt-3 space-y-2">

            {resumeData.suggestions?.map((item, index) => (

              <li key={index}>

                {item}

              </li>

            ))}

          </ul>

        </div>

      </div>

    )}

  </MainLayout>

);

}

export default Resume;