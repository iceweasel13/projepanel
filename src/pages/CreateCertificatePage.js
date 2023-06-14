import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";

const CreateCertificatePage = () => {
  const address = useAddress();
  const [project, setProject] = useState(null);
  const [certificateName, setCertificateName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [ca, setCa] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/projects/${address}`
        );
        setProject(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (address) {
      fetchProject();
    }
  }, [address]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!project) {
      console.error("No project found for this address");
      return;
    }

    const newCertificate = {
      projectId: project._id, // Assuming the project has _id as its unique identifier
      projectName: project.title, // Assuming the project has a 'name' property
      title: certificateName,
      description,
      logo,
      contractAddress: ca,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/certificates",
        newCertificate
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">
        Create Certificate
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="certificateName"
          >
            Certificate Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
            id="certificateName"
            type="text"
            placeholder="Enter certificate name"
            value={certificateName}
            onChange={(e) => setCertificateName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="ca"
          >
            Contract Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
            id="ca"
            type="text"
            placeholder="Enter CA"
            value={ca}
            onChange={(e) => setCa(e.target.value)}
          />

          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="logo"
          >
            Logo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
            id="logo"
            type="text"
            placeholder="Enter logo URL"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create Certificate
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCertificatePage;
