import {createTheme} from '@mui/material/styles';

export const  theme = createTheme({
    components:{
        MuiPagination:{
            styleOverrides:{
                root:{
                    paddingTop:'4rem',
                    paddingLeft:'50rem'
                }
            }
        },
        MuiTableHead:{
            styleOverrides:{
                root:{
                    backgroundColor:'#85929E',
                }
            }
        },
    }
})