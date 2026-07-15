function CertificateForm({

  certificates,

  setCertificates

}) {

  const handleChange = (index, field, value) => {

    const updated = [...certificates];

    updated[index][field] = value;

    setCertificates(updated);

  };

  const addCertificate = () => {

    setCertificates([

      ...certificates,

      {

        name: "",

        organization: "",

        issueDate: "",

        credentialId: "",

        credentialUrl: ""

      }

    ]);

  };

  const removeCertificate = (index) => {

    if (certificates.length === 1) return;

    const updated = certificates.filter((_, i) => i !== index);

    setCertificates(updated);

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold text-blue-700">

          🏆 Certifications

        </h2>

        <button

          onClick={addCertificate}

          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

        >

          + Add

        </button>

      </div>

      {certificates.map((certificate, index) => (

        <div

          key={index}

          className="border rounded-xl p-5 mt-6"

        >

          <div className="flex justify-between items-center mb-4">

            <h3 className="font-semibold">

              Certificate {index + 1}

            </h3>

            {certificates.length > 1 && (

              <button

                onClick={() => removeCertificate(index)}

                className="text-red-600 font-semibold"

              >

                Remove

              </button>

            )}

          </div>

          <div className="space-y-4">

            <input

              type="text"

              placeholder="Certificate Name"

              value={certificate.name}

              onChange={(e)=>

                handleChange(index,"name",e.target.value)

              }

              className="w-full border rounded-lg p-3"

            />

            <input

              type="text"

              placeholder="Issuing Organization"

              value={certificate.organization}

              onChange={(e)=>

                handleChange(index,"organization",e.target.value)

              }

              className="w-full border rounded-lg p-3"

            />

            <label className="text-sm text-gray-500">

              Issue Date

            </label>

            <input

            type="month"

            value={certificate.issueDate}

            onChange={(e)=>

            handleChange(index,"issueDate",e.target.value)

            }

            className="w-full border rounded-lg p-3"

        />

            <input

              type="text"

              placeholder="Credential ID (Optional)"

              value={certificate.credentialId}

              onChange={(e)=>

                handleChange(index,"credentialId",e.target.value)

              }

              className="w-full border rounded-lg p-3"

            />

            <input

              type="text"

              placeholder="Credential URL (Optional)"

              value={certificate.credentialUrl}

              onChange={(e)=>

                handleChange(index,"credentialUrl",e.target.value)

              }

              className="w-full border rounded-lg p-3"

            />

          </div>

        </div>

      ))}

    </div>

  );

}

export default CertificateForm;