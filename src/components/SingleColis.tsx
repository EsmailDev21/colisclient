import { Tr, Th, HStack, IconButton, Badge } from '@chakra-ui/react'
import React from 'react'

import {CloseIcon, CheckIcon} from "@chakra-ui/icons"
interface Props{
    id:string,
    owner:string,
    arrived:boolean,
    createdAt:Date,
    arrivedAt:Date 
    onDelete:()=>void,
    onValidate:()=>void
}
const SingleColis:React.FC<Props> = ({...props}:Props) => {
    const user = JSON.parse(localStorage.getItem("user")??"")
  return (
    <Tr>
      <Th>{props.id}</Th>
        <Th><Badge colorScheme={"blue"}>{props.owner}</Badge></Th>
        <Th>{props.arrived===true?<Badge colorScheme={"whatsapp"}>Arrived</Badge>:<Badge colorScheme={"yellow"}>Not Arrived yet</Badge>}</Th>
        <Th>{new Date(props.createdAt).toLocaleDateString()}</Th>
        <Th>{props.arrived!=false?<Badge colorScheme={"whatsapp"}>{new Date(props.arrivedAt).toLocaleDateString()}</Badge>:<Badge colorScheme={"yellow"}>Not Arrived yet</Badge>}</Th>
        {user.role==="ADMIN"?<Th>
            <HStack>
                <IconButton onClick={props.onDelete} aria-label='delete' colorScheme='red' icon={<CloseIcon />} />
                <IconButton onClick={props.onValidate} isDisabled={props.arrived} aria-label='validate' colorScheme='whatsapp' icon={<CheckIcon />} />
            </HStack>
        </Th>:null}
      </Tr>
  )
}

export default SingleColis
