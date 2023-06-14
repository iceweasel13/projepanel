import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [projectName, setProjectName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const address = useAddress();
  const [project, setProject] = useState(null);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/projects/${address}`
        );
        setProject(res.data);
        if (res.data) {
          setUrl(res.data.url);
          setLogo(res.data.logo);
          setProjectName(res.data.title);
          setIntroduction(res.data.introduction);
          setInstagram(res.data.instagram);
          setTwitter(res.data.twitter);
          setLinkedin(res.data.linkedin);
          setWebsite(res.data.website);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (address) {
      fetchProject();
    }
  }, [address]);
  const handleLogoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const project = {
      url,
      logo,
      projectName,
      introduction,
      instagram,
      twitter,
      linkedin,
      website,
    };

    try {
      await axios.put(`http://localhost:5000/api/projects/${address}`, project);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">Profile</h1>
        {!isEditing && (
          <button
            className="bg-black text-white rounded-lg py-2 px-4"
            onClick={handleEditClick}
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
          </button>
        )}
        {isEditing && (
          <button
            className="bg-black text-white rounded-lg py-2 px-4"
            onClick={handleSaveClick}
          >
            Save
          </button>
        )}
      </div>

      {/* Profile data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label className="block mb-2">Logo:</label>
          <input
            type="text"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label className="block mb-2">Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label className="block mb-2">Introduction:</label>
          <input
            type="text"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label className="block mb-2">Instagram:</label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label className="block mb-2">Twitter:</label>
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label className="block mb-2">LinkedIn:</label>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label className="block mb-2">Website:</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            disabled={!isEditing}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
