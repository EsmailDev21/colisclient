import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiurl } from "../apiurl";
import axios from "axios";
import { ChevronDownIcon } from "@chakra-ui/icons";

type FormData = {
    createdAt?:Date,
    userId:string
};
export default function AddColis() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState<FormData>({
    userId:"",
    createdAt:new Date()
  });
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(apiurl + "/user");
      setUsers(res.data);
    };
    getUsers();
  }, []);

  const createColis = async (e:React.FormEvent,data:FormData) => {
    e.preventDefault();
    try {
        const res = await axios.post(apiurl+"/colis",data)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
  }
  console.log(formData)
  return (
    <>
      <Button
        onClick={onOpen}
        loadingText="Submitting"
        size="lg"
        bg={"brown"}
        color={"white"}
        _hover={{
          bg: "brown",
        }}
      >
        Add Colis
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        
        <form onSubmit={e=>createColis(e,formData)}>
        <ModalContent>
          <ModalHeader>Add Colis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <VStack>
                <FormControl>
                    <FormLabel>Colis Owner :</FormLabel>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Select User
                    </MenuButton>
                    <MenuList>
                      {users &&
                        users.map((user,index) => <MenuItem onClick={()=>setFormData(prev=>{return {...prev,userId:user.id}})} key={index}>{user.name}</MenuItem>)}
                    </MenuList>
                  </Menu>
                </FormControl>
                <FormControl>
                <FormLabel>Created at :</FormLabel> 
                <Input type="date" onChange={(e)=>setFormData(prev=>{return {...prev,createdAt:new Date(e.target.value)}})} value={formData.createdAt?.toString()??""} />
                </FormControl>
              </VStack>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
            type="submit"
              loadingText="Submitting"
              size="md"
              bg={"brown"}
              color={"white"}
              _hover={{
                bg: "brown",
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
        </form>
      </Modal>
    </>
  );
}
