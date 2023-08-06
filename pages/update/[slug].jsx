import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, updateContact } from '../src/redux/slice/contact';
const initialValues = {
  email: "",
  name: "",
  phone:"",
  address:"",
  message:""
};
function Update() {
  const dispatch = useDispatch();


  //-->function for getting all contacts
  const fetchContacts =async()=>{
  const res = await dispatch(getContacts())
  // console.log(res);
  }

 useEffect(() => {
  //-->function calling getting all contacts 
   fetchContacts()
 }, [])
  const router = useRouter();
  var id;
  const query = router.query.slug;
const contacts = useSelector((state)=>state.contact)
console.log(contacts);
const contactId = contacts&& contacts.contact.length>0&& contacts.contact.filter((item)=>{
  id=item._id
  return id === query;
})
console.log(contactId);

 const [contactData,setContactData]= useState({
  name:contactId&&contactId.length>0&&contactId[0].name,
  email:contactId&&contactId.length>0&&contactId[0].email,
  phone:contactId&&contactId.length>0&&contactId[0].phone,
  address:contactId&&contactId.length>0&&contactId[0].address,
  message:contactId&&contactId.length>0&&contactId[0].message,

 })

 const handleChangeContactValue =(e)=>{
  setContactData({...contactData,[e.target.name]:e.target.value})
 }
 const handleUpdate =async()=>{

  const res = await dispatch(updateContact(contactData,contactId[0]._id))
  fetchContacts()
  }
  return (
    <Box sx={{display:'flex',gap:"20px",margin:'20px',flexDirection:{md:"row",sm:"row",xs:"column"}}}>
    <Box sx={{maxWidth:"750px",flex:'2'}}>
    <Box sx={{height:"50px",backgroundColor:"#00C47F",display:"flex",justifyContent:"center",alignItems:'center',}}>
    <Typography sx={{fontSize:{md:"24px",sm:'18px',xs:'16px'},fontWeight:'600'}}>Contact form</Typography>
    </Box>
<Box sx={{backgroundColor:'#fff',padding:"20px"}}>
          <Grid
            container
            spacing={3}
            sx={{
              "& .MuiInputoutlined-input": {
                // marginBottom:"70px",
                fontSize: "20px",
                paddingLeft: "30px",
                height:'30px'
              },
            }}
          >
            <Grid md={6} sm={12} xs={12} item >
              <TextField
                type="text"
                name="name"
                onChange={(e,value)=> handleChangeContactValue(e,'name')}
                value={contactData.name}
                placeholder="Enter your full name"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid md={6} sm={12} xs={12} item >
              <TextField
                type="email"
                name="email"
                value={contactData.email}
                onChange={(e,value)=> handleChangeContactValue(e,'email')}
                placeholder="Enter your Email id"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>

            <Grid md={6} sm={12} xs={12} item>
              <TextField
                type="number"
                name="phone"
                  onChange={(e,value)=> handleChangeContactValue(e,'phone')}
                  value={contactData.phone}
                placeholder="Enter your Mobile number"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid md={6} sm={12} xs={12} item>
              <TextField
                type="text"
                name="address"
                value={contactData.address}
                onChange={(e,value)=> handleChangeContactValue(e,'address')}
                placeholder="Enter your address"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                type="message"
                name="message"
                  onChange={(e,value)=> handleChangeContactValue(e,'message')}
                  value={contactData.message}
                placeholder="Write something..."
                variant="outlined"
                fullWidth
              />
            </Grid>
              
          </Grid>
          <Box sx={{paddingY:"10px"}}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#0C487C",
                  "&:hover": {
                    background: "#0C487C",
                  },
                }}
                onClick={handleUpdate}
              >
                Update
              </Button>
              </Box>
</Box>
  </Box>
<Box sx={{flex:'2',backgroundColor:"Menu",}}>
<Box sx={{height:"50px",backgroundColor:"#CADDD6",display:"flex",justifyContent:"center",alignItems:'center',}}>
    <Typography sx={{fontSize:{md:"24px",sm:'18px',xs:'16px'},fontWeight:'600'}}>Review</Typography>
    </Box>
    <Box sx={{color:"#000",padding:"10px",height:"100%"}}>
<Typography sx={{fontSize:'20px',fontWeight:"600"}}>Name :  <span style={{fontSize:"14px",fontWeight:'400'}}>{contactId&&contactId.length>0&&contactId[0].name}</span></Typography>
<Typography sx={{fontSize:'20px',fontWeight:"600"}}>Email :  <span style={{fontSize:"14px",fontWeight:'400'}}>{contactId&&contactId.length>0&&contactId[0].email}</span></Typography>
<Typography sx={{fontSize:'20px',fontWeight:"600"}}>Phone :  <span style={{fontSize:"14px",fontWeight:'400'}}>{contactId&&contactId.length>0&&contactId[0].phone}</span></Typography>
<Typography sx={{fontSize:'20px',fontWeight:"600"}}>Address :  <span style={{fontSize:"14px",fontWeight:'400'}}>{contactId&&contactId.length>0&&contactId[0].address}</span></Typography>
<Typography sx={{fontSize:'20px',fontWeight:"600"}}>Message :  <span style={{fontSize:"14px",fontWeight:'400'}}>{contactId&&contactId.length>0&&contactId[0].message}</span></Typography>
    </Box>
</Box>
  </Box>
  )
}

export default Update