'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiurl } from '../apiurl'

export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  console.log({name,email,password})
  const toast = useToast()
  const signin =async (event:React.FormEvent,data:{email:string,password:string})=>{
    event.preventDefault()
    try{
      const response = await axios.post(apiurl+"/user/auth/signin",{
        email:data.email,
        password:data.password
      })
      console.log(response.data)
      localStorage.setItem("user",JSON.stringify(response.data))
      if(response.data){
        toast({
          title:"Logged in successfully",
          description:"Welcome back!",
          status:"success",
          duration:5000
        })
        setTimeout(()=>navigate("/home"),5000)
      }
    }catch(err){
      console.log(err)
      toast({
        title:"Failed to login!",
        description:"Please check your credentials, or try again later",
        status:"error",
        duration:5000
      })
    }
  }
  return (
    <Box width={"100vw"} alignItems={"center"}>
        <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in</Heading>
          
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={e=>signin(e,{email,password})}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input value={email} onChange={event=>setEmail(event.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input value={password} onChange={event=>setPassword(event.target.value)} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Text>I don't have an account</Text>
                <Text color={'brown'}><Link href='/signup'>Signup</Link></Text>
              </Stack>
              <Button
              type='submit'
                bg={'brown'}
                color={'white'}
                _hover={{
                  bg: 'brown',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
    </Box>
  )
}