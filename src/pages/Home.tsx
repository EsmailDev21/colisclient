import React from 'react'
import Navbar from '../components/Navbar'
import { Box, Divider, Stack } from '@chakra-ui/react'
import ColisTable from '../components/ColisTable'
import AddColis from '../components/AddColis'

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user")??"")
  return (
    <Box w={"100vw"} display={"flex"} flexDirection={"column"}>
     <Navbar /> 
      <Stack direction={"column"} alignItems={"center"} spacing={6}  p={10} mt={5}>
        {user.role==="ADMIN"?<AddColis />:null}
        <Divider />
      <ColisTable />
      </Stack>
    </Box>
  )
}

export default Home
