import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getProfile, updateProfile } from "../../api/profileApi";
import toast from "react-hot-toast";

function Profile() {

  const [profile, setProfile] = useState(null);

  const [edit, setEdit] = useState(false);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const data = await getProfile();

      if (data.success) {

        setProfile(data);

        setName(data.user.name);

        setPhone(data.resume?.phone || "");

      }

    } catch (error) {

      console.log(error);

      toast.error("Unable to load profile.");

    }

  };

  const handleSave = async () => {

  try {

    const data = await updateProfile({
      name,
      phone,
    });

    if (data.success) {

      toast.success("Profile Updated");

      setEdit(false);

      await loadProfile();

      // Navbar + Dashboard + Profile sab jagah naya name update ho jayega
      setTimeout(() => {

        window.location.reload();

      }, 800);

    }

  } catch (error) {

    console.log(error);

    toast.error("Update Failed");

  }

};

  return (

    <MainLayout>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">

            {profile?.user?.name?.charAt(0).toUpperCase()}

          </div>

          <div>

            <h1 className="text-4xl font-bold">

              {profile?.user?.name}

            </h1>

            <p className="text-gray-500">

              {profile?.user?.email}

            </p>

          </div>

        </div>

        <hr className="my-8"/>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="font-semibold">

              Name

            </label>

            <input

              value={name}

              disabled={!edit}

              onChange={(e)=>setName(e.target.value)}

              className="w-full mt-2 border rounded-lg p-3"

            />

          </div>

          <div>

            <label className="font-semibold">

              Phone

            </label>

            <input

              value={phone}

              disabled={!edit}

              onChange={(e)=>setPhone(e.target.value)}

              className="w-full mt-2 border rounded-lg p-3"

            />

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-blue-50 rounded-xl p-5">

            <h3 className="font-bold">

              ATS Score

            </h3>

            <p className="text-4xl font-bold text-blue-700 mt-3">

              {profile?.resume?.ats_score ?? "--"}%

            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <h3 className="font-bold">

              Skills

            </h3>

            <div className="flex flex-wrap gap-2 mt-3">

              {profile?.resume?.skills?.map((skill,index)=>(

                <span

                  key={index}

                  className="bg-green-200 px-3 py-1 rounded-full"

                >

                  {skill}

                </span>

              ))}

            </div>

          </div>

        </div>

        <div className="mt-8">

          <h2 className="text-2xl font-bold mb-3">

            Education

          </h2>

          <p>

            {profile?.resume?.education || "--"}

          </p>

        </div>

        <div className="mt-8">

          <h2 className="text-2xl font-bold mb-3">

            Experience

          </h2>

          <p>

            {profile?.resume?.experience || "--"}

          </p>

        </div>

        <div className="flex gap-4 mt-10">

          {!edit ? (

            <button

              onClick={()=>setEdit(true)}

              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"

            >

              Edit Profile

            </button>

          ) : (

            <button

              onClick={handleSave}

              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"

            >

              Save Changes

            </button>

          )}

        </div>

      </div>

    </MainLayout>

  );

}

export default Profile;