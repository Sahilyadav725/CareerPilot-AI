import MainLayout from "../../layouts/MainLayout";

function About() {

  return (

    <MainLayout>

      <div className="max-w-6xl mx-auto py-20 px-6">

        <h1 className="text-5xl font-bold text-center">

          About CareerPilot

        </h1>

        <p className="text-center text-gray-600 mt-5 text-lg">

          CareerPilot is an AI-powered career platform designed to help students and professionals build ATS-friendly resumes, discover personalized job opportunities, and plan their career journey with intelligent recommendations.

        </p>

      </div>

    </MainLayout>

  );

}

export default About;