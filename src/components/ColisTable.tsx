import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  HStack,
  IconButton,
  Spinner,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SingleColis from "./SingleColis";
import { rawData } from "../data";
import axios from "axios";
import { apiurl } from "../apiurl";
import { SearchIcon } from "@chakra-ui/icons";
type Colis = {
  id: string;
  owner: string;
  arrived: boolean;
  createdAt: Date;
  arrivedAt: Date | null;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    joinedAt: Date;
    role: string;
  };
};
const ColisTable = () => {
  const [colis, setColis] = useState<Colis[]>([]);
  const [loading, setLoading] = useState(false);
  const [reload,setReload] = useState(false)
  const [searh,setSearch] = useState("")
  const user = JSON.parse(localStorage.getItem("user")??"")
  useEffect(() => {
    const getColis = async () => {
      setLoading(true);
      const res = await axios.get(apiurl + "/colis");
      if (res.data) {
        setColis(res.data);
        setLoading(false);
      }
    };
    getColis();
  }, [reload]);

  const validateColis = async (id: string) => {
    try {
      const res = await axios.patch(apiurl + "/colis/" + id);
      console.log(res.data);
      setReload(!reload)
    } catch (error) {
      console.log(error);
    }
  };
  const deleteColis = async (id: string) => {
    try {
      const res = await axios.delete(apiurl + "/colis/" + id);
      console.log(res.data);
      setReload(!reload)
    } catch (error) {
      console.log(error);
    }
  };
  const searchHandler = (query:string) => {
    setColis(colis.filter((item)=>item.user.name.includes(query)))
    console.log(colis)
    
}
  return (
    <><HStack>
          <Input value={searh} onChange={(e)=>{
            
            setSearch(e.target.value)
           
            
          }} rounded={"full"} />
          <IconButton onClick={()=>searchHandler(searh)} aria-label="search" rounded={"full"} icon={<SearchIcon />} />
      </HStack><TableContainer border={"1px"} borderColor={"brown"} rounded={"md"}>
              <Table variant="simple">
                  <TableCaption>Colis table</TableCaption>
                  <Thead>
                      <Tr>
                          <Th>Colis Id</Th>
                          <Th>Owner</Th>
                          <Th>Arrived</Th>
                          <Th>Created at</Th>
                          <Th>Arrived at</Th>
                         {user.role==="ADMIN"? <Th>Actions</Th>:null}
                      </Tr>
                  </Thead>
                  <Tbody>
                      {loading === true ? (
                          <Spinner color="brown" />
                      ) : user.role==="ADMIN"? 
                          colis.map((i) => (
                              <SingleColis
                                  {...i}
                                  arrivedAt={new Date()}
                                  onDelete={() => deleteColis(i.id)}
                                  onValidate={() => validateColis(i.id)}
                                  owner={i.user.name} />
                          )):colis.filter(i=>i.user.id===user.id).map((i) => (
                            <SingleColis
                                {...i}
                                arrivedAt={new Date()}
                                onDelete={() => deleteColis(i.id)}
                                onValidate={() => validateColis(i.id)}
                                owner={i.user.name} />
                        ))
                      }
                  </Tbody>
                  <Tfoot>
                      <Tr>
                          <Th>Colis Id</Th>
                          <Th>Owner</Th>
                          <Th>Arrived</Th>
                          <Th>Created at</Th>
                          <Th>arrived at</Th>
                          {user.role==="ADMIN"? <Th>Actions</Th>:null}
                      </Tr>
                  </Tfoot>
              </Table>
          </TableContainer></>
  );
};

export default ColisTable;
