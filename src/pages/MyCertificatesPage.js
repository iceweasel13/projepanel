import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
const MyCertificatePage = () => {
  const [project, setProject] = useState(null);
  const [data, setData] = useState([]);
  const address = useAddress();
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

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!project) {
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/certificates/project/${project._id}`
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCertificates();
  }, [project]);

  const columns = [
    {
      name: "logo",
      selector: (row) => row.logo,
      sortable: false,
      cell: (row) => <img src={row.logo} alt="logo" className="h-12 w-12" />,
    },
    {
      name: "contractAddress",
      selector: (row) => row.contractAddress,
      sortable: true,
    },
    {
      name: "title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "description",
      selector: (row) => row.description,
      sortable: true,
    },
  ];
  console.log(data);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">My Certificates</h1>
      <DataTable title="Certificates" columns={columns} data={data} />
    </div>
  );
};

export default MyCertificatePage;
