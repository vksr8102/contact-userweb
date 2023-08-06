import { Box, Button, Grid, TextField, Typography, styled } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createContact, getContacts } from '../redux/slice/contact';
import Link from 'next/link';
const StyleToolbar = styled(Box)(({theme})=>({
    padding:"40px 80px",
    display:"flex",
    [theme.breakpoints.down("md")]:{
      padding:"20px"
     },
   [theme.breakpoints.down("sm")]:{
    flexDirection:'column-reverse',
    padding:"15px"
   }
}))
const initialValues = {
  email: "",
  name: "",
  phone:"",
  address:"",
  message:""
};
function Contact() {
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
 var result ;
  const {values, errors, touched, handleBlur, handleChange, handleSubmit}=useFormik({

   initialValues:initialValues,
   onSubmit: async (values, action) => {
    const { email, name,phone,address,message} = values;
    // console.log(values);
    const data = { email:email,name:name,phone:phone,address:address,message:message };
     result = await dispatch(createContact(data));
     action.resetForm();
    //  console.log(result);
  },
  })

  const contacts = useSelector((state)=>state.contact)
  console.log(contacts);
  return (
    <StyleToolbar>
    <Box sx={{flex:"2",backgroundColor:"Menu",}}>
<Typography sx={{height:"50px",backgroundColor:"#F7941E",display:"flex",justifyContent:"center",alignItems:'center',fontSize:{md:"24px",sm:'18px',xs:'16px'},fontWeight:'600'}}>Contact Information</Typography>
<Box sx={{padding:"10px",display:"flex",flexWrap:"wrap",gap:"5px"}}>
  <Typography sx={{color:"#000"}}>For Edit the contact just click any email which do you want to edit</Typography>
  <Typography sx={{fontSize:"18px",}}>Priview</Typography>
  {contacts&&contacts.contact&&contacts.contact.length>0&&contacts.contact.map((item)=>(
        <Link href={`/update/${item._id}`} style={{textDecoration:'none'}}>
    <Box sx={{display:'flex',justifyContent:'space-between',border:"1px solid #000",width:"100%",padding:"10px"}} key={item._id}>
<Typography sx={{}} >{item&&item.name}</Typography>
<Typography sx={{}} >{item&&item.email}</Typography>
<Typography sx={{}} >{item&&item.phone}</Typography>
<Box><Button variant='contained'>Update</Button></Box>
      </Box>
</Link>
))}
</Box>
    </Box>
    <Box sx={{flex:"2",height:'100%'}}>
      <Box sx={{height:"50px",backgroundColor:"#00C47F",display:"flex",justifyContent:"center",alignItems:'center',}}>
      <Typography sx={{fontSize:{md:"24px",sm:'18px',xs:'16px'},fontWeight:'600'}}>Contact form</Typography>
      </Box>
<Box sx={{backgroundColor:'#fff'}}>
<form noValidate  style={{ padding:"10px 10px" }} onSubmit={handleSubmit}>
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
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your address"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  type="message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Write something..."
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "#0C487C",
                    "&:hover": {
                      background: "#0C487C",
                    },
                  }}
                >
                  Submit
                </Button>
                </Box>
                
                 
              </Grid>
            </Grid>
          </form>
</Box>
    </Box>
    </StyleToolbar>
  )
}

export default Contact